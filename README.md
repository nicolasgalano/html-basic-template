## Overview
This is a blank template for each project that uses Bootstrap, Sass, Pug (ex-Jade) and Gulp, following MVCSS [Modular View CSS] architecture.


## Requirements

* Node v4.0+ - [Install](https://nodejs.org/en/download/)
* npm - [Install](https://docs.npmjs.com/getting-started/installing-node)


## Resources

- [MVCSS](http://mvcss.io/)
- [Bootstrap(Sass)](http://getbootstrap.com/css/#sass) / [package](https://www.npmjs.com/package/bootstrap-sass)
- [Pug](https://www.npmjs.com/package/gulp-pug)
- [Sass](https://www.npmjs.com/package/gulp-sass)
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
- [Gulp-PostCSS](https://www.npmjs.com/package/gulp-postcss)
- [Jquery](http://api.jquery.com/)
- [Jquery Validation](https://jqueryvalidation.org/documentation/)

## Local setup

1. **Define your new project's name**
	[project-name]

2. **Clone this repository and unbind it** with the next line:
	```shell
	git clone --depth=1 git@github.com:mobomo/html-basic-template.git [project-name] && rm -rf [project-name]/.git
	```

2. **Go into the root of the project** with the next line:
	```shell
	$ cd [project-name]
	```

3. **Install JS dependencies**
	```shell
	# @ root-folder/
	$ npm install -g gulp-cli
	$ npm install
	```

4. **Run Gulp watch**
	```shell
	# @ root-folder/
	$ gulp watch
	```
