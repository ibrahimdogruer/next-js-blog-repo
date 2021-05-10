import { DateTime } from "luxon";

export default function Comments({ comments }) {
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
      {comments?.map(comment => {
        return (
          <div key={comment.id} className="flex items-center space-x-2">
            <img
              src={comment.picture}
              alt={comment.name}
              width={50}
              className="rounded-full"
            />
            <div>
              <div className="space-x-2">
                <b>{comment.name}</b>
                <time className="text-gray-400">
                  {DateTime.fromMillis(comment.createdAt).toRelative()}
                </time>
              </div>
              <p>{comment.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
