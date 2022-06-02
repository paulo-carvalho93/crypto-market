import React from 'react';

import { useCryptoContext } from '../../CryptoContext';

const Login = () => {
  const { handleVisibleModal } = useCryptoContext();

  return (
    <div>Login</div>
  )
}

export default Login;