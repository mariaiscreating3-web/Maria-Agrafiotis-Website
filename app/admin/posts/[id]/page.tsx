"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PostEditor } from "@/components/post-editor";
import type { Post } from "@/lib/post-types";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then(setPost)
      .catch(() => {});
  }, [id]);

  if (!post) {
    return (
      <div className="p-8">
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", opacity: 0.5 }}>
          Loading…
        </p>
      </div>
    );
  }

  return <PostEditor initial={post} postId={post.id} />;
}
