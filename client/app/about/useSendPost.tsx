import { useMutation } from "@tanstack/react-query";

const postSimpsons = async (newSimpson: any) => {
  const response: any = fetch("http://localhost:8080/api/sCharacters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newSimpson }),
  });
};

const useSendPost = () => 
  useMutation(postSimpsons, {
    onSuccess: () => {
      // Success actions
    },
    onError: (error) => {
      // Error actions
    },
  });

export default useSendPost;
