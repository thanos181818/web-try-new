import React from 'react';
import { Link } from 'react-router-dom';
import './DetailsPage.css';
import { downloadReport, printReport } from './Report';

const importImages = (r) => r.keys().map(r.default || r);
const images = importImages(require.context('../pictures_audio', false, /\.(png)$/));

const DetailsPage = ( anomalies ) => { // Default value to prevent undefined
  return (
    <div className="details-page">
      <div className="action-buttons">
        <button onClick={() => downloadReport(anomalies)} className="btn action-btn">Download Report</button>
        <button onClick={printReport} className="btn action-btn">Print Report</button>
      </div>
      <h1>Video Analysis Details</h1>


      <div className="video-info">
        <h2>PhotoPhethylsmoGraphy (PPG)</h2>
        {images.length > 0 && (
          <img
            src={images[0]}
            style={{ margin: '10px', width: '200px', height: '200px', borderRadius: '8px' }}
            alt="First file"
          />
        )}
        <h3>Deepfake Detection</h3>
        <ul>
          <li>In real videos, the green channel captures natural patterns of blood flow caused by the heartbeat.</li>
          <li>In fake videos (deepfakes), these natural patterns are often missing, inconsistent, or artificial. By analyzing the green channel, it’s easier to spot these issues and tell if the video is fake.</li>
        </ul>

        <h3>In a Fake Video:</h3>
        <ul>
          <li>The face doesn't naturally generate subtle changes in light caused by blood flow under the skin (which real PPG signals depend on).</li>
          <li>These messy signals are a sign that the video is synthetic or altered, as the fake face fails to mimic the natural blood flow patterns.</li>
        </ul>

        <h3>In a Real Video:</h3>
        <ul>
          <li>The face naturally generates subtle light changes due to blood flowing under the skin, which aligns with the heartbeat. This creates smooth and consistent patterns in the PPG signals.</li>
          <li>These clear, regular rhythms indicate that the video is authentic, as the face reflects genuine blood flow patterns that match natural human physiology.</li>
        </ul>
      </div>

      
      <div className="analysis-result">
        <h2>Anomalies</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Anomaly ID</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Description</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Result</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Median Anomaly Score</th>
            </tr>
          </thead>
          <tbody>
            {anomalies.length > 0 ? (
              anomalies.map((anomaly) => (
                <tr key={anomaly.anomaly_id}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{anomaly.anomaly_id}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{anomaly.name}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{anomaly.description}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{anomaly.Result}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                    {anomaly.Video_Median_Anomaly_Score[0]?.toFixed(3)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>
                  No anomalies detected.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="video-info">
        <h2>PhotoPhethylsmoGraphy (PPG)</h2>
        {images.length > 0 && (
          <img
            src={images[0]}
            style={{ margin: '10px', width: '200px', height: '200px', borderRadius: '8px' }}
            alt="First file"
          />
        )}
        <h3>Deepfake Detection</h3>
        <ul>
          <li>In real videos, the green channel captures natural patterns of blood flow caused by the heartbeat.</li>
          <li>In fake videos (deepfakes), these natural patterns are often missing, inconsistent, or artificial. By analyzing the green channel, it’s easier to spot these issues and tell if the video is fake.</li>
        </ul>

        <h3>In a Fake Video:</h3>
        <ul>
          <li>The face doesn't naturally generate subtle changes in light caused by blood flow under the skin (which real PPG signals depend on).</li>
          <li>These messy signals are a sign that the video is synthetic or altered, as the fake face fails to mimic the natural blood flow patterns.</li>
        </ul>

        <h3>In a Real Video:</h3>
        <ul>
          <li>The face naturally generates subtle light changes due to blood flowing under the skin, which aligns with the heartbeat. This creates smooth and consistent patterns in the PPG signals.</li>
          <li>These clear, regular rhythms indicate that the video is authentic, as the face reflects genuine blood flow patterns that match natural human physiology.</li>
        </ul>
      </div>

      <div className="video-info">
        <h2>Audio Analysis</h2>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            style={{ margin: '10px', width: '200px', height: 'auto', borderRadius: '8px' }}
            alt={`Audio visual ${index}`}
          />
        ))}
        <h3>How Mel Spectrogram Helps in Deepfake Detection:</h3>
        <ul>
          <li>
            <strong>Turning Sound into Pictures:</strong> By converting audio into a mel spectrogram, we can use computers to look for patterns that might not be obvious just by listening. This is helpful for spotting fake sounds.
          </li>
          <li>
            <strong>Finding Patterns:</strong> Real sounds have natural, consistent patterns. Fake sounds, like those created by computers, might have weird or unnatural patterns. The mel spectrogram helps us see these differences.
          </li>
          <li>
            <strong>Checking Timing and Pitch:</strong> The mel spectrogram shows how pitches (high or low sounds) and timing evolve over time, which can highlight unnatural features in fake audio.
          </li>
          <li>
            <strong>Spotting Noise and Background Sounds:</strong>Real audio recordings often include background noise (like wind, traffic, or room sounds). Fake audio might miss these natural noises or add them in an unnatural way. We can see this in the mel spectrogram.
          </li>
        </ul>

        <h3>What a Real Audio Looks Like in a Mel Spectrogram:</h3>
        <ul>
          <li><strong>Smooth Harmonics:</strong>Real audio has smooth, predictable lines in the spectrogram that represent natural sounds like voices or music.</li>
          <li><strong>Natural Variations:</strong>Genuine audio shows natural rises and falls in volume and pitch over time. These changes look smooth in the spectrogram.</li>
          <li><strong>Environmental Sounds:</strong> Real audio includes random background noises that create unique patterns. These are often missing or oddly placed in fake audio.</li>
        </ul>

        <h3>What a Fake Audio Might Look Like in a Mel Spectrogram:</h3>
        <ul>
          <li><strong>Unnatural Patterns:</strong> Irregular or repetitive shapes that don't look natural.</li>
          <li><strong>Abrupt Changes:</strong> Sudden jumps or shifts indicating artificial modification.</li>
          <li><strong>Lack of Detail:</strong> Missing fine details like background noises or natural voice variations, making the spectrogram look too clean.</li>
          <li><strong>Repeating Patterns:</strong> More repetitive shapes or lines than expected.</li>
          <li><strong>Artificial Artifacts:</strong> Strange, out-of-place shapes or noise introduced during fake audio creation.</li>
        </ul>
      </div>
      <Link to="/" className="btn back-btn">Back to Upload</Link>
    </div>
  );
};

export default DetailsPage;
