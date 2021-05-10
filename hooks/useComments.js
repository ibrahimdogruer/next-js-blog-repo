import { useEffect, useState } from "react";

import Swal from 'sweetalert2'
import { useAuth0 } from "@auth0/auth0-react";

export default function () {
  const { getAccessTokenSilently } = useAuth0();

  const [url, setUrl] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComment = async () => {
    const query = new URLSearchParams({ url });
    const newUrl = `/api/comment?${query.toString()}`;
    const response = await fetch(newUrl, {
      method: "GET",
    });
    const data = await response.json();
    setComments(data);
  };

  useEffect(() => {
    if (!url) return;
    fetchComment();
  }, [url]);

  useEffect(() => {
    const url = window.location.origin + window.location.pathname;
    setUrl(url);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const userToken = await getAccessTokenSilently();

    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ text, userToken, url }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => alert(err));
    fetchComment();
    setText("");
  };

  const removeComment = async (comment) => {
    const userToken = await getAccessTokenSilently();
    await fetch("/api/comment", {
      method: "DELETE",
      body: JSON.stringify({ url, comment, userToken }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          alert(res.statusText);
        } else {
          fetchComment();
          Swal.fire(
            'Silindi!',
            'Yorumun silindi.',
            'success'
          )
        }
      })
      .catch((err) => alert(err));
  };

  return [comments, onSubmit, text, setText, removeComment];
}
