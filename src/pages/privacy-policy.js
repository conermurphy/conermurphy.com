import React from 'react';
import styled from 'styled-components';
import { promptUserReconfirm } from '../utils/checkForAnalyticsCookie';

export default function PrivacyPolicy() {
  return (
    <div>
      <h1>Privacy Policy</h1>
      <button onClick={() => promptUserReconfirm()} type="button">
        Change Cookie Choice
      </button>
    </div>
  );
}
