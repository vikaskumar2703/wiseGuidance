import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-purple text-white py-10 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 px-6 text-sm">
        <div className="md:col-span-2">
          <h2 className="text-base font-bold">
            wise<br></br> Guidance
          </h2>
          <p className="mt-8 w-1/2 font-extralight ">
            Connecting future founders and marketers with battle-hardened
            mentors that genuinely enjoy helping people.
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold">Platform</h3>
          <ul className="mt-6 space-y-1 font-extralight">
            <li>
              <a href="#" className="hover:underline">
                How it works
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Become a mentor
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Partner discounts
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms and Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold">Resources</h3>
          <ul className="mt-6 space-y-1 font-extralight">
            <li>
              <a href="#" className="hover:underline">
                Use Cases
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Podcasts
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Video Library
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Mentor Column
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold">Company</h3>
          <ul className="mt-6 space-y-1 font-extralight">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Customer Stories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Write for Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold">Socials</h3>
          <ul className="mt-6 space-y-1 font-extralight">
            <li>
              <a href="#" className="hover:underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="row-start-2 col-start-3 col-span-2">
          <FontAwesomeIcon className="p-5 text-2xl" icon={faXTwitter} />
          <FontAwesomeIcon className="p-5 text-2xl" icon={faFacebook} />
          <FontAwesomeIcon className="p-5 text-2xl" icon={faInstagram} />
          <FontAwesomeIcon className="p-5 text-2xl" icon={faYoutube} />
        </div>
      </div>
      <div className="container mx-auto mt-8 px-6 flex justify-between">
        <p className="text-sm">© 2023 wiseGuidance All rights reserved.</p>
        <p className="text-sm">
          Made with love <i className="fa-solid fa-heart "></i> by Vikas Kumar
        </p>
      </div>
    </footer>
  );
}
