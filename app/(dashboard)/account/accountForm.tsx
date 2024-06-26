"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountForm({ user }: { user: User | null }) {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [public_id, setpublic_id] = useState("");
    const [genre, setGenre] = useState<string | null>(null);
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState("");

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("users")
                .select(`full_name, username, public_id, avatar_url, genre`)
                .eq("id", user?.id)
                .single();

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setpublic_id(data.public_id);
                setImageUrl(data.avatar_url);
                setGenre(data.genre);
            }
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);









    

    async function updateProfile({
        username,
    }: {
        username: string | null;
        fullname: string | null;
    }) {
        try {
            setLoading(true);

            const { error } = await supabase.from("profiles").upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                avatar_url: imageUrl,
                public_id,
                genre: genre,
                updated_at: new Date().toISOString(),
            });
            if (error) throw error;
            const { data } = await supabase.auth.updateUser({
                data: {
                    name: username,
                    full_name: fullname,
                    avatar_url: imageUrl,
                    picture: imageUrl,
                    public_id,
                    genre: genre,
                },
            });

            if (error) throw error;

            alert("Profile updated!");
            router.push("/");
        } catch (error) {
            alert("Error updating the data!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="">
            <div className="mb-4 mt-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="text" value={user?.email} disabled />
            </div>
            <div className="mb-4">
                <Label htmlFor="fullName">Nombre</Label>
                <Input
                    id="fullName"
                    type="text"
                    placeholder="Nombre"
                    value={fullname || ""}
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <Label htmlFor="username">Usuario</Label>
                <Input
                    id="username"
                    type="text"
                    placeholder="Usuario"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <Label htmlFor="genre">Género</Label>
                <select
                    id="genre"
                    value={genre || ""}
                    onChange={(e) => setGenre(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>option]:line-clamp-1 select-options ">
                    <option value="">Selecciona un género</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                </select>
            </div>
{/*
            <ImageCloudinary
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setPublicId={setpublic_id}
                publicId={public_id}
            />*/}

            <div className="mb-4 mt-4">
                <Button
                    className={`${loading ? "cursor-not-allowed" : ""}`}
                    onClick={() => updateProfile({ fullname, username })}
                    disabled={loading}>
                    {loading ? "Actualizando ..." : "Actualizar"}
                </Button>
            </div>
        </section>
    );
}
