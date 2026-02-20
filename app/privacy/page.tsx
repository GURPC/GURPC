import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - GURPC',
  description: 'Privacy policy for the Green University Research & Publication Community platform.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'February 21, 2026';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 font-mono">Last updated: {lastUpdated}</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Introduction</h2>
            <p>
              Green University Research &amp; Publication Community (&quot;GURPC,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy of our members, visitors, and users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect information about you in a variety of ways, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, department, batch year, and other profile information you voluntarily provide when registering for an account.</li>
              <li><strong>Academic Information:</strong> Research interests, publications, academic links (Google Scholar, ORCID, ResearchGate, IEEE, GitHub), and uploaded research papers.</li>
              <li><strong>Usage Data:</strong> Information about how you access and use the platform, including pages visited, features used, and interaction patterns.</li>
              <li><strong>Device Data:</strong> Browser type, operating system, IP address, and other technical information collected automatically when you visit our site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To create and manage your account on the platform.</li>
              <li>To facilitate research collaboration, group formation, and project tracking.</li>
              <li>To display your public profile to other community members.</li>
              <li>To send you updates about GURPC events, workshops, and relevant academic opportunities.</li>
              <li>To improve our platform, services, and user experience.</li>
              <li>To maintain security and prevent unauthorized access.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Data Sharing &amp; Disclosure</h2>
            <p className="mb-3">We do not sell your personal information. We may share your data only in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>With Other Members:</strong> Your public profile information (name, department, research interests) is visible to other registered users to facilitate collaboration.</li>
              <li><strong>With Green University:</strong> Aggregated, anonymized data may be shared with Green University of Bangladesh for academic reporting purposes.</li>
              <li><strong>Service Providers:</strong> We use third-party services (such as Supabase for authentication and data storage, Vercel for hosting) that process data on our behalf under strict confidentiality agreements.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal processes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data, including encryption in transit (HTTPS/TLS), secure authentication, and row-level security policies on our database. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to provide our services. If you request account deletion, we will remove your personal data within 30 days, except where retention is required by law or for legitimate academic record-keeping purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and review the personal data we hold about you.</li>
              <li>Update or correct your profile information at any time through your account settings.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Opt out of non-essential communications.</li>
              <li>Export your data in a portable format.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Cookies</h2>
            <p>
              We use essential cookies for authentication and session management. We do not use third-party advertising or tracking cookies. Your theme preference (light/dark mode) is stored locally in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Children&apos;s Privacy</h2>
            <p>
              Our platform is intended for university students, faculty, and researchers. We do not knowingly collect personal data from individuals under the age of 16.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify registered users of any material changes via email or a prominent notice on the platform. Your continued use of the platform after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-none pl-0 mt-3 space-y-1">
              <li><strong>Email:</strong> <a href="mailto:gurpc.gub@gmail.com" className="text-green-600 dark:text-green-400 hover:underline">gurpc.gub@gmail.com</a></li>
              <li><strong>Phone:</strong> +880 1531-361741</li>
              <li><strong>Address:</strong> Green University of Bangladesh, Purbachal American City, Kanchan, Rupganj, Dhaka, Bangladesh</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            See also: <Link href="/terms" className="text-green-600 dark:text-green-400 hover:underline">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
