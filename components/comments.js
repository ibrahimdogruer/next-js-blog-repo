import { DateTime } from "luxon";
import Swal from 'sweetalert2'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function Comments({ comments, removeComment }) {
  const { isAuthenticated, user } = useAuth0();

  const remove = async (comment) => {
    await Swal.fire({
      title: 'Yorumunu silmek istediğine emin misin?',
      text: "Bunu geri çeviremezsin!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: "Vazgeç"
    }).then((result) => {
      if (result.isConfirmed) {
        removeComment(comment)
      }
    })
  };

  if (!comments || !comments?.length) {
    return (
      <div className="mt-5 flex justify-center items-center bg-gray-300 p-2 rounded">
        <span>Henüz bir yorum yapılmamış!</span>
      </div>
    );
  }
  return (
    <div className="mt-6 py-4 space-y-4">
      <hr className="mb-6" />
      {comments?.map((comment) => {
        return (
          <div key={comment.id} className="flex items-center space-x-2">
            <img
              src={comment.picture}
              width={50}
              className="rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/avatar.jpeg";
              }}
            />
            <div>
              <div className="space-x-2">
                <b>{comment.name}</b>
                <time className="text-gray-400">
                  {DateTime.fromMillis(comment?.created_at || Date.now()).toRelative()}
                </time>
                {isAuthenticated && comment.email === user.email && (
                  <button type="button" onClick={() => remove(comment)}>
                    <span className="text-red-800">x</span>
                  </button>
                )}
              </div>
              <p>{comment.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
