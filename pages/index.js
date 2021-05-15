function HomePage() {
  return (
    <>
      <div className="site-container">
        <div className="mb-10 flex justify-center">
          <img
            src="/me.jpeg"
            alt=""
            className="w-60 h-60 rounded-full object-cover border-black border-2
            dark:border-gray-500"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">
            Ben İbrahim Doğruer. Bursa'da yaşayan Yazılım Geliştiricisiyim.
          </h1>

          <p>
            Front-end teknolojileri, React Native ile Mobil uygulama geliştirme
            konularıyla ilgileniyorum.
          </p>

          <p>Amacım, edindiğim bilgileri bu blog aracılığıyla paylaşmak.</p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
