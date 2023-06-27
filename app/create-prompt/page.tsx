"use client";
import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

interface IPost{
  prompt: string,
  tag: string
}
const CreatePrompt = () => {
  const router = useRouter();
  const {data: session} = useSession();


  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        })
      })
      // console.log(response)
      if(response.ok){
        router.push("/");
      }else{
        // TODO: Create error toast if something went wrong
      }
    } catch (error) {
      console.log(error);
    }finally{
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  )
}

export default CreatePrompt
