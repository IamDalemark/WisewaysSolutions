interface TermsAndConditionsProps {
  onHandleAccept: () => void;
  onHandleCancel: () => void;
}

const TermsAndConditions = ({
  onHandleAccept,
  onHandleCancel,
}: TermsAndConditionsProps) => {
  return (
    <div
      className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md overflow-y-auto h-[80vh] mt-2"
      data-cy="terms-modal"
    >
      <h2 className="text-2xl font-bold text-teal-700 mb-4">
        Terms and Conditions
      </h2>
      <div className="space-y-4 text-sm text-gray-700">
        <p>
          By using this website, you agree to comply with and be bound by the
          following terms and conditions of use. If you disagree with any part
          of these terms, please do not use our website.
        </p>

        <h3 className="text-lg font-semibold mt-4">1. Use of the Website</h3>
        <p>
          The content of this website is for your general information and use
          only. It is subject to change without notice. Unauthorized use of this
          website may give rise to a claim for damages and/or be a criminal
          offense.
        </p>

        <h3 className="text-lg font-semibold mt-4">
          2. Account Responsibilities
        </h3>
        <p>
          If you create an account, you are responsible for maintaining the
          confidentiality of your login credentials and for all activities that
          occur under your account.
        </p>

        <h3 className="text-lg font-semibold mt-4">3. Privacy Policy</h3>
        <p>
          We are committed to protecting your privacy. Any information you
          provide is subject to our privacy policy, which governs how we collect
          and use personal data.
        </p>

        <h3 className="text-lg font-semibold mt-4">4. Modifications</h3>
        <p>
          We may revise these terms and conditions from time to time. Any
          changes will be posted on this page, and your continued use of the
          site after such changes constitutes your acceptance of the new terms.
        </p>

        <h3 className="text-lg font-semibold mt-4">5. Contact</h3>
        <p>
          If you have any questions about these Terms and Conditions, please
          contact us at{" "}
          <span className="text-teal-700">info@wisewayssolutions.com</span>
        </p>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={onHandleCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          data-cy="cancel-terms-btn"
        >
          Cancel
        </button>
        <button
          onClick={onHandleAccept}
          className="px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800"
          data-cy="accept-terms-btn"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
