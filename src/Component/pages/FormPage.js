import { useParams } from 'react-router-dom';

const FormPage = () => {
  const { formType } = useParams();

  return (
    <div>
      {formType === 'membership' && <MembershipApplicationForm />}
      {formType === 'loan' && <LoanApplicationForm />}
    </div>
  );
};