import AuthForm from '@/components/auth-form';

export default async function Home({searchParams}) {
  const FormMode = searchParams.mode || 'login'
  // console.log(searchParams);
  
  return <AuthForm mode={FormMode}/>;
}
