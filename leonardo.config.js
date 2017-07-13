module.exports = {
	// BASIC DATA:

	title: 'Blog Title',
	url: 'http://localhost:4000',
	baseurl: '',
	languages: ['EN', 'ES'],
	activeLanguages: ['EN'],

	// STACK TECHNOLOGIES:

	markdown: '',

	// INDEXED DATA SOURCES:

	sources: {
		posts: {
			// TODO: Should be indexed by datetime, as well as images, to be able to cross-reference them
			// Custom properties will be extracted from the src attribute and added to each source data object once
			// loaded.
			src: 'data/posts/{datetime}/metadata.js',
			single: false, // TODO: Force to be loaded as an array
			refs: {
				// Refs are other sources that will be injected into the current one when loaded, so this source will be
				// treated as a function when required.
				tags: 'tags',
				authors: 'authors',
				// Refs can also load new content that will be added to each source data object once loaded. If only
				// this type of ref is used, the current source will be required as an object and not as a function.
				body: {
					src: './{title}.{=LANG}.markdown',
					single: true, // TODO: Force to load just first
				},
				/* images: { // TODO: Configure gulp task to move images preserving folder structure...
					src: './images',
					sort: [['date', 'ASC']],
				}, */
			},
			sort: {
				attr: 'datetime',
				dir: 'ASC',
			},
		},
		tags: {
			src: 'data/tags/tags.{=LANG}.js',
			refs: {
				total: (tag, posts) => posts.filter(post => post.tags.indexOf(tag) !== -1).length,
			},
		},
		authors: {
			src: 'data/authors/authors.js',
			refs: {
				total: (author, posts) => posts.filter(post => post.authors.indexOf(author) !== -1).length,
			},
		},
	},

	// OR:

	// TODO: How to add images array from folder to posts without adding them manually?

	pages: [{
		// HOME
		url: '/',
		template: 'index/index.html',
	}, {
		// POSTS LIST
		url: '/blog',
		source: 'posts',
		template: 'blog/blog.html',
		pagination: {},
	}, {
		// POST DETAIL
		url: '/blog/:title',
		source: [
			['posts', ':title'],
		],
		template: '',
		pagination: {},
		reference: true, // Generate a text/JSON file with all the tags (or a typescript type file!)... TODO: Part of srouces
		stats: true, // Include stats TODO: Part of srouces
	}, {
		// ARCHIVE
		url: '/archive',
		source: 'posts',
		template: 'archive/archive.html',
		pagination: {}, // TODO: Add pagination per sort field (date.year)
	}, {
		// TAGS LIST
		url: '/tags',
		source: 'tags',
		template: '',
		pagination: {}, // TODO: Add pagination per letter (A, B, C...)
		reference: true, // Generate a text/JSON file with all the tags (or a typescript type file!)... TODO: Part of srouces
		stats: true, // Include stats TODO: Part of srouces
	}, {
		// POSTS PER TAG
		url: '/tags/:tag',
		source: [
			['tags', ':tag'],
			['posts', (posts, tag) => posts.filter(post => post.tags.indexOf(tag) !== -1)],
		],
		template: '',
		pagination: {},
		reference: true, // Generate a text/JSON file with all the tags (or a typescript type file!)... TODO: Part of srouces
		stats: true, // Include stats TODO: Part of srouces
	}, {
		// AUTHORS LIST
		url: '/authors',
		source: 'authors',
		template: '',
		pagination: {},
		reference: true, // Generate a text/JSON file with all the tags (or a typescript type file!)... TODO: Part of srouces
		stats: true, // Include stats TODO: Part of srouces
	}, {
		// PORTS PER AUTHOR
		url: '/authors/:author',
		source: [
			['authors', ':author'],
			['posts', (posts, author) => posts.filter(post => post.author === author)],
		],
		template: '',
		pagination: {},
		reference: true, // Generate a text/JSON file with all the tags (or a typescript type file!)... TODO: Part of srouces
		stats: true, // Include stats TODO: Part of srouces
	}],
};
