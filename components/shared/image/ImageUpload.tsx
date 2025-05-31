'use client'

import { useRef, useState, useEffect } from 'react';
import { NextPage } from 'next';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { ImageTypes, UserTypes } from '@/types/types';
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { Progress } from '@/components/ui/progress';
import { twMerge } from 'tailwind-merge';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
    children: React.ReactNode;
    user: UserTypes;
}

const ImageUpload: NextPage<Props> = ({ children, user }) => {
    const { update } = useSession();
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [open, setOpen] = useState(false);

    const abortController = useRef(new AbortController());

    // Clean up preview URL
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const authenticator = async () => {
        const res = await fetch("/api/auth/upload");
        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Request failed with status ${res.status}: ${errText}`);
        }
        return await res.json();
    };

    const handleUpdateImage = async (url: string) => {
        setUpdating(true);
        try {
            const res = await fetch('/api/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    image: url,
                }),
            });

            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || 'Failed to update user');
            }

            await update({ email: user.email }); // refresh token
            router.refresh(); // refresh server-side session
            setError("");
            handleReset(); // reset everything
            setOpen(false); // close modal
        } catch (err: any) {
            console.error('Update error:', err);
            setError(err.message || 'Something went wrong while updating user.');
        } finally {
            setUpdating(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setProgress(0);
        setError("");
    };

    const handleUpload = async () => {
        if (!file) return;
        setError("");
        setUploading(true);

        try {
            const { signature, expire, token, publicKey } = await authenticator();

            const res = await upload({
                file,
                folder: "/master-data/user",
                fileName: file.name,
                signature,
                token,
                expire,
                publicKey,
                onProgress: (e) => setProgress((e.loaded / e.total) * 100),
                abortSignal: abortController.current.signal,
            });

            await handleUpdateImage(res.url || "");
        } catch (err: any) {
            if (err instanceof ImageKitAbortError) {
                setError("Upload aborted");
            } else if (err instanceof ImageKitInvalidRequestError) {
                setError("Invalid request");
            } else if (err instanceof ImageKitUploadNetworkError) {
                setError("Network error");
            } else if (err instanceof ImageKitServerError) {
                setError("Server error");
            } else {
                setError(err?.message || "Something went wrong");
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='!max-w-[400px] space-y-4'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Select and upload your image</DialogTitle>
                </DialogHeader>

                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full max-w-[250px] mx-auto aspect-square border rounded-xl primary-border object-cover"
                    />
                )}

                <Input
                    type='file'
                    accept="image/*"
                    className='m-0'
                    onChange={(e) => {
                        const selected = e.target.files?.[0];
                        if (selected) {
                            setFile(selected);
                            setPreview(URL.createObjectURL(selected));
                        }
                    }}
                />

                <div>
                    {
                        error && <p className='text-base text-center text-red-500 pb-2'>{error}</p>
                    }
                    <button
                        onClick={handleUpload}
                        className={twMerge('px-4 py-2 bg-blue-600 text-white rounded w-full cursor-pointer disabled:cursor-not-allowed disabled:brightness-70', uploading && "rounded-b-none")}
                        disabled={uploading || !file || updating}
                    >
                        {uploading ? "Uploading..." : (updating ? "Updating..." : "Upload")}
                    </button>
                    {
                        uploading && <Progress className='rounded-t-none' value={progress} />
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ImageUpload;
