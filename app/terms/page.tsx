import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - GURPC',
  description: 'Terms of service for the Green University Research & Publication Community platform.',
};

export default function TermsPage() {
  const lastUpdated = 'February 21, 2026';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 font-mono">Last updated: {lastUpdated}</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Green University Research &amp; Publication Community (&quot;GURPC&quot;) platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Eligibility</h2>
            <p>
              The GURPC platform is primarily intended for current students, alumni, faculty, and staff of Green University of Bangladesh. By creating an account, you represent that you have a legitimate affiliation with the university or have been granted access by a GURPC administrator.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must provide accurate and complete information when creating your account.</li>
              <li>You are solely responsible for all activities that occur under your account.</li>
              <li>You must notify us immediately of any unauthorized use of your account.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Acceptable Use</h2>
            <p className="mb-3">When using the GURPC platform, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the platform only for legitimate academic and research purposes.</li>
              <li>Respect the intellectual property rights of others.</li>
              <li>Not upload or share plagiarized, fabricated, or falsified research content.</li>
              <li>Not engage in harassment, discrimination, or any form of abusive behavior toward other members.</li>
              <li>Not attempt to gain unauthorized access to other users&apos; accounts or data.</li>
              <li>Not use the platform for any commercial or for-profit purposes without prior authorization.</li>
              <li>Comply with all applicable laws and university regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Your Content:</strong> You retain ownership of all research papers, publications, and content you upload to the platform. By uploading content, you grant GURPC a non-exclusive, royalty-free license to display and distribute it within the platform for collaboration purposes.</li>
              <li><strong>Platform Content:</strong> The GURPC platform design, code, branding, and original content are the property of GURPC and Green University of Bangladesh.</li>
              <li><strong>Academic Integrity:</strong> All research shared on the platform must adhere to accepted standards of academic integrity. Plagiarism or data fabrication will result in immediate account suspension.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Research Groups &amp; Projects</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Group administrators are responsible for moderating their group&apos;s content and members.</li>
              <li>Projects created on the platform should be related to academic research or publication activities.</li>
              <li>Collaboration within groups should follow ethical research practices and university guidelines.</li>
              <li>GURPC reserves the right to remove groups or projects that violate these terms or university policies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Publication &amp; Paper Submissions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Papers uploaded to the platform should be original work or properly attributed collaborative efforts.</li>
              <li>Authors are responsible for ensuring proper co-author consent before uploading shared work.</li>
              <li>GURPC does not serve as a formal publication venue — it is a collaboration and tracking tool.</li>
              <li>Copyright of published papers remains with the respective publishers and authors.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Disclaimer of Warranties</h2>
            <p>
              The GURPC platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that the platform will be uninterrupted, error-free, or free of harmful components. We make no warranties regarding the accuracy or reliability of any content posted by users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Limitation of Liability</h2>
            <p>
              GURPC, its administrators, and Green University of Bangladesh shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform, including but not limited to loss of data, research content, or academic opportunities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">10. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for violations of these terms, university policies, or at the request of Green University administration. You may also delete your own account at any time through the profile settings. Upon termination, your personal data will be handled in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">11. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will provide notice of material changes through the platform or via email. Continued use of the platform after modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">12. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh. Any disputes arising from these terms shall be subject to the jurisdiction of the courts in Dhaka, Bangladesh.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">13. Contact Information</h2>
            <p>
              For questions or concerns about these Terms of Service, please contact us:
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
            See also: <Link href="/privacy" className="text-green-600 dark:text-green-400 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
