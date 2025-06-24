const Footer = () => {
    const year = new Date().getFullYear();
    return (
      <div className="flex justify-center items-center bg-gray-100 w-full p-4 gap-2 text-gray-700">
        Created By
        <a href="">Valarmathi</a>
        <span>&copy;</span>
        {year}
        <strong>The Hungry Bites</strong>
      </div>
    )
  }

export default Footer;