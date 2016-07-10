console.log('AUTHORS PAGE');

// Includes its inline SCSS so that it is bundled in a separated file that will be included in a <style> tag in the head
// of this page:

import './authors.inline.scss';

// Includes main.scss so that all the common (components, layout...) CSS is bundled inside styles.scss, which should be
// included in a <link> tag in every page:

import '../../components/main.scss';
