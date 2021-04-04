function HomePage() {
  return (
    <>
      <div className="site-container">
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
      <div className="site-4xl-container mt-20">
          <img src="/me.jpeg" alt="" height="100%" />
      </div>
    </>
  );
}

export default HomePage;
