import './style.css';

const API_KEY =
  import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';

const app = document.querySelector('#app');

const API_URL =
  `https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(API_KEY)}`;


/*
|--------------------------------------------------------------------------
| HTML escaping
|--------------------------------------------------------------------------
*/

function escapeHTML(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


/*
|--------------------------------------------------------------------------
| YouTube URL handling
|--------------------------------------------------------------------------
*/

function getYouTubeEmbedURL(url) {
  try {
    const parsedURL = new URL(url);

    const hostname =
      parsedURL.hostname.toLowerCase();

    if (hostname.includes('youtu.be')) {
      const videoId =
        parsedURL.pathname.replace('/', '');

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    if (hostname.includes('youtube.com')) {
      const videoId =
        parsedURL.searchParams.get('v');

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (
        parsedURL.pathname.startsWith('/embed/')
      ) {
        return url;
      }
    }

    return url;
  } catch {
    return url;
  }
}


/*
|--------------------------------------------------------------------------
| Media renderer
|--------------------------------------------------------------------------
*/

function createMedia(data) {
  const mediaType = data.media_type;
  const url = data.url;

  if (!url) {
    return `
      <div class="media-error">
        MEDIA SIGNAL UNAVAILABLE
      </div>
    `;
  }


  /*
  |--------------------------------------------------------------------------
  | Image
  |--------------------------------------------------------------------------
  */

  if (mediaType === 'image') {
    return `
      <div class="media-container image-container">

        <img
          class="apod-image"
          src="${escapeHTML(url)}"
          alt="${escapeHTML(
            data.title ||
            'NASA Astronomy Picture of the Day'
          )}"
          loading="eager"
        >

      </div>
    `;
  }


  /*
  |--------------------------------------------------------------------------
  | Video
  |--------------------------------------------------------------------------
  */

  if (mediaType === 'video') {

    const isYouTube =
      url.toLowerCase().includes('youtube');

    /*
    |--------------------------------------------------------------------------
    | YouTube video
    |--------------------------------------------------------------------------
    */

    if (isYouTube) {

      const embedURL =
        getYouTubeEmbedURL(url);

      return `
        <div class="media-container video-container">

          <iframe
            src="${escapeHTML(embedURL)}"
            title="${escapeHTML(
              data.title || 'NASA APOD video'
            )}"
            loading="eager"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share
            "
            allowfullscreen
          ></iframe>

        </div>
      `;
    }


    /*
    |--------------------------------------------------------------------------
    | Direct video
    |--------------------------------------------------------------------------
    */

    return `
      <div class="media-container video-container">

        <video
          src="${escapeHTML(url)}"
          controls
          preload="metadata"
        >
          Your browser does not support
          HTML5 video.
        </video>

      </div>
    `;
  }


  /*
  |--------------------------------------------------------------------------
  | Unsupported media
  |--------------------------------------------------------------------------
  */

  return `
    <div class="media-error">
      UNSUPPORTED MEDIA FORMAT
    </div>
  `;
}


/*
|--------------------------------------------------------------------------
| Render APOD
|--------------------------------------------------------------------------
*/

function renderAPOD(data) {

  const date =
    escapeHTML(
      data.date || 'UNKNOWN DATE'
    );

  const title =
    escapeHTML(
      data.title ||
      'UNTITLED COSMIC OBJECT'
    );

  const description =
    escapeHTML(
      data.explanation ||
      'No description was transmitted by NASA.'
    );

  const copyright =
    data.copyright
      ? `© ${escapeHTML(data.copyright)}`
      : 'NASA / PUBLIC DOMAIN';

  const media =
    createMedia(data);


  /*
  |--------------------------------------------------------------------------
  | Single DOM update
  |--------------------------------------------------------------------------
  */

  app.innerHTML = `

    <main class="page-shell">


      <!-- HEADER -->

      <header class="site-header">

        <div class="brand">

          <div class="brand-mark">
            ✦
          </div>

          <div>

            <p class="eyebrow">
              NASA // DEEP SPACE NETWORK
            </p>

            <h1>
              ASTRONOMY<br>
              PICTURE OF THE DAY
            </h1>

          </div>

        </div>


        <div class="status">

          <span class="status-dot"></span>

          <span>
            LIVE SIGNAL
          </span>

        </div>

      </header>


      <!-- HERO -->

      <section class="hero">

        <div class="hero-label">

          <span class="line"></span>

          <span>
            TODAY'S COSMIC TRANSMISSION
          </span>

          <span class="line"></span>

        </div>


        <!-- APOD CARD -->

        <article class="apod-card">


          <!-- CARD HEADER -->

          <div class="card-top">

            <span class="date-badge">
              ${date}
            </span>

            <span class="media-type">
              ${escapeHTML(
                (data.media_type || 'UNKNOWN')
                  .toUpperCase()
              )}
            </span>

          </div>


          <!-- MEDIA -->

          ${media}


          <!-- CONTENT -->

          <div class="content">


            <div class="title-section">

              <span class="title-index">
                APOD // ${date}
              </span>

              <h2>
                ${title}
              </h2>

            </div>


            <div class="description">

              <p>
                ${description}
              </p>

            </div>


            <div class="card-footer">

              <span>
                ${copyright}
              </span>

              <span>
                NASA APOD DATABASE
              </span>

            </div>

          </div>

        </article>

      </section>


      <!-- FOOTER -->

      <footer class="site-footer">

        <span>
          TRANSMISSION COMPLETE
        </span>

        <span>
          NASA API // APOD
        </span>

        <span>
          DEEP SPACE OBSERVATORY
        </span>

      </footer>

    </main>
  `;
}


/*
|--------------------------------------------------------------------------
| Error screen
|--------------------------------------------------------------------------
*/

function renderError(error) {

  console.error(
    'NASA APOD error:',
    error
  );

  app.innerHTML = `

    <main class="error-screen">

      <div class="error-card">

        <div class="error-icon">
          !
        </div>

        <p class="eyebrow">
          NASA // SIGNAL ERROR
        </p>

        <h1>
          TRANSMISSION LOST
        </h1>

        <p class="error-message">
          Unable to retrieve today's
          Astronomy Picture of the Day.
        </p>

        <p class="error-detail">
          ${escapeHTML(
            error.message ||
            'Unknown network error.'
          )}
        </p>

        <button
          class="retry-button"
          id="retry-button"
          type="button"
        >
          RETRY CONNECTION
        </button>

      </div>

    </main>
  `;


  const retryButton =
    document.querySelector(
      '#retry-button'
    );

  retryButton?.addEventListener(
    'click',
    fetchAPOD
  );
}


/*
|--------------------------------------------------------------------------
| Fetch NASA APOD
|--------------------------------------------------------------------------
*/

async function fetchAPOD() {

  /*
  |--------------------------------------------------------------------------
  | Immediate loading state
  |--------------------------------------------------------------------------
  */

  app.innerHTML = `

    <div class="loading-screen">

      <div class="loader"></div>

      <p>
        ESTABLISHING NASA UPLINK...
      </p>

    </div>
  `;


  try {

    const response =
      await fetch(API_URL);


    if (!response.ok) {

      throw new Error(
        `NASA API returned HTTP ${response.status}.`
      );

    }


    const data =
      await response.json();


    if (data.error) {

      throw new Error(
        data.error.message ||
        'NASA API returned an error.'
      );

    }


    if (
      !data.title ||
      !data.date ||
      !data.media_type
    ) {

      throw new Error(
        'NASA returned incomplete APOD data.'
      );

    }


    renderAPOD(data);

  } catch (error) {

    renderError(error);

  }
}


/*
|--------------------------------------------------------------------------
| Application start
|--------------------------------------------------------------------------
*/

fetchAPOD();
