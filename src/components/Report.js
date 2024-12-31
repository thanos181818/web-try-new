import jsPDF from 'jspdf';
import "jspdf-autotable";

export const downloadReport = ({ videoMetadata, anomalies }) => {
  const doc = new jsPDF();
  
  // HTML Template for Report with Embedded CSS
  const reportHTML = `
    <html>
      <head>
        <style>
          .body-container-virsah {
            font-family: "Times New Roman", Times, serif;
            font-size: 12pt;
            line-height: 1.3;
            margin: 0;
            padding: 20px;
            width: 210mm;
            height: 297mm;
            box-sizing: border-box;
            background-color: #ffffff;
          }

          .main-wrapper-virsah {
            border: 1px solid #000000;
            padding: 20px;
            height: 100%;
            position: relative;
          }

          .timestamp-virsah {
            position: absolute;
            top: 5px;
            right: 10px;
            font-size: 10pt;
            color: #666;
          }

          .content-section-virsah {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .video-info-box-virsah {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #000000;
            padding: 10px;
          }

          .video-thumbnail-virsah {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border: 1px solid #000000;
            margin-right: 10px;
          }

          .video-info-virsah {
            flex: 1;
          }

          .video-info-virsah p {
            margin: 3px 0;
          }

          .donut-chart-virsah {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            position: relative;
            background: conic-gradient(#ff4444 93%, #44ff44 0);
          }

          .donut-chart-virsah::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 50%;
          }

          .donut-label-virsah {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            font-weight: bold;
          }

          .main-content-virsah {
            display: flex;
            gap: 15px;
          }

          .left-column-virsah, .right-column-virsah {
            flex: 1;
          }

          .section-heading-virsah {
            font-size: 14pt;
            font-weight: bold;
            margin: 0 0 5px 0;
          }

          .summary-list-virsah {
            padding-left: 20px;
            margin: 5px 0;
          }

          .summary-list-virsah li {
            margin-bottom: 3px;
          }

          .frames-grid-virsah {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 10px;
          }

          .frame-virsah {
            width: 150px;
            height: 150px;
            border: 1px solid #000000;
            background-color: #f0f0f0;
            object-fit: cover;
          }

          .anomaly-table-virsah {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }

          .anomaly-table-virsah th,
          .anomaly-table-virsah td {
            border: 1px solid #000000;
            padding: 5px;
            text-align: left;
            font-size: 11pt;
          }

          .table-header-virsah {
            background-color: #000000;
            color: #ffffff;
          }

          .anomaly-table-virsah tr:nth-child(even) {
            background-color: #f8f8f8;
          }

          .ppg-score-virsah,
          .audio-poc-virsah {
            margin-top: 15px;
          }

          .score-text-virsah {
            margin: 3px 0;
          }

          .score-box-virsah {
            border: 1px solid #000000;
            padding: 8px;
            background-color: #f9f9f9;
            margin-top: 5px;
          }

          .score-image-virsah {
            width: 200px;
            height: 100px;
            object-fit: cover;
          }

          .footer-virsah {
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10pt;
          }
        </style>
      </head>
      <body class="body-container-virsah">
        <div class="main-wrapper-virsah">
          
          <div class="content-section-virsah">
            <div class="video-info-box-virsah">
              <img src="placeholder.jpg" alt="Video Thumbnail" class="video-thumbnail-virsah">
              <div class="video-info-virsah">
                <p><strong>Video name:</strong> ${videoMetadata.video_name}</p>
                <p><strong>Duration:</strong> ${videoMetadata.video_length}</p>
                <p><strong>Resolution:</strong> ${videoMetadata.resolution}</p>
                <p><strong>Source:</strong> ${videoMetadata.source}</p>
              </div>
              <div class="donut-chart-virsah">
                <div class="donut-label-virsah">
                  ${Math.round(videoMetadata.fake_confidence * 100)}%<br>FAKE
                </div>
              </div>
            </div>
            <div class="main-content-virsah">
              <div class="left-column-virsah">
                <section class="summary-virsah">
                  <h2 class="section-heading-virsah">Summary</h2>
                  <p>The video analysis indicates a high probability (${Math.round(videoMetadata.fake_confidence * 100)}%) of deepfake manipulation. Key observations include:</p>
                  <ul class="summary-list-virsah">
                    <li>Inconsistent facial movements detected in multiple frames</li>
                    <li>Audio-visual synchronization discrepancies noted</li>
                    <li>Unusual blinking patterns observed throughout the video</li>
                    <li>Artifacts detected around the mouth region during speech</li>
                    <li>Inconsistent lighting and shadows across facial features</li>
                  </ul>
                </section>
                <section class="frames-grid-virsah">
                  <img src="placeholder.jpg" alt="Frame 1" class="frame-virsah">
                  <img src="placeholder.jpg" alt="Frame 2" class="frame-virsah">
                  <img src="placeholder.jpg" alt="Frame 3" class="frame-virsah">
                  <img src="placeholder.jpg" alt="Frame 4" class="frame-virsah">
                </section>
              </div>
              <div class="right-column-virsah">
                <section class="anomaly-section-virsah">
                  <h2 class="section-heading-virsah">Anomaly Table</h2>
                  <table class="anomaly-table-virsah">
                    <thead>
                      <tr class="table-header-virsah">
                        <th>ID</th>
                        <th>Anomaly</th>
                        <th>Description</th>
                        <th>Result</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${anomalies.map((anomaly) => {
                        return `
                          <tr>
                            <td>${anomaly.anomaly_id}</td>
                            <td>${anomaly.name}</td>
                            <td>${anomaly.description}</td>
                            <td>${anomaly.Result}</td>
                            <td>${anomaly.Video_Median_Anomaly_Score[0]?.toFixed(3) || 'N/A'}</td>
                          </tr>
                        `;
                      }).join('')}
                    </tbody>
                  </table>
                </section>
                <section class="ppg-score-virsah">
                  <h2 class="section-heading-virsah">PPG Score</h2>
                  <p class="score-text-virsah">Overall PPG Score: 7.8/10</p>
                  <p class="score-text-virsah">Confidence: High</p>
                  <div class="score-box-virsah">
                    <img src="placeholder.jpg" alt="PPG Score Graph" class="score-image-virsah">
                  </div>
                </section>
                <section class="audio-poc-virsah">
                  <h2 class="section-heading-virsah">Audio POC</h2>
                  <p class="score-text-virsah">Audio Manipulation Detected: Yes</p>
                  <p class="score-text-virsah">Confidence: ${Math.round(videoMetadata.fake_confidence * 100)}%</p>
                  <div class="score-box-virsah">
                    <img src="placeholder.jpg" alt="Audio POC Graph" class="score-image-virsah">
                  </div>
                </section>
              </div>
            </div>
          </div>
          <footer class="footer-virsah">
            <p>Deepfake Detection at APEX 0110</p>
          </footer>
        </div>
      </body>
    </html>`;

  // Add print functionality
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  iframe.style.display = 'none';
  iframe.contentDocument.open();
  iframe.contentDocument.write(reportHTML);
  iframe.contentDocument.close();

  iframe.contentWindow.print();
  document.body.removeChild(iframe);
};

export const printReport = () => {
  window.print();
};
