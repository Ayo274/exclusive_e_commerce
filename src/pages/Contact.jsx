import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-sm text-gray-500 mb-10">
        Home / <span className="text-black">Contact</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-md p-8">
          <div className="border-b border-gray-300 pb-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-primaryRed text-white rounded-full flex items-center justify-center">
                <FaPhoneAlt />
              </div>
              <h3 className="font-semibold">Call To Us</h3>
            </div>
            <p className="text-sm mb-2">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-sm">Phone: +8801611112222</p>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-primaryRed text-white rounded-full flex items-center justify-center">
                <FaEnvelope />
              </div>
              <h3 className="font-semibold">Write To Us</h3>
            </div>
            <p className="text-sm mb-2">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-sm mb-1">Emails: customer@exclusive.com</p>
            <p className="text-sm">Emails: support@exclusive.com</p>
          </div>
        </div>

        <div className="w-full lg:w-2/3 bg-white shadow-md rounded-md p-8">
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="bg-gray-100 p-3 rounded focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="bg-gray-100 p-3 rounded focus:outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Your Phone *"
                className="bg-gray-100 p-3 rounded focus:outline-none"
                required
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows="8"
              className="bg-gray-100 p-3 rounded focus:outline-none resize-none"
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primaryRed text-white px-8 py-3 rounded hover:bg-red-600 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
