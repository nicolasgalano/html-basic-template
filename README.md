## Overview
This is a blank template for each project that uses Bootstrap, Sass, Pug (ex-Jade) and Gulp, following MVCSS [Modular View CSS] architecture.


## Requirements

* npmjs - [Install](https://docs.npmjs.com/getting-started/installing-node)
* Composer - [Install](https://getcomposer.org/download/)


## Resources

- [MVCSS](http://mvcss.io/)
- [Bootstrap(Sass)](http://getbootstrap.com/css/#sass) / [package](https://www.npmjs.com/package/bootstrap-sass)
- [Pug](https://www.npmjs.com/package/gulp-pug)
- [Sass](https://www.npmjs.com/package/gulp-sass)
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
- [Gulp-PostCSS](https://www.npmjs.com/package/gulp-postcss)


## Local setup

1. **Define your new project's name**
	[proyect-name]

2. **Clone this repository and unbind it** with the next line:
	```shell
	git clone --depth=1 git@github.com:mobomo/html-basic-template.git [proyect-name] && rm -rf [proyect-name]/.git
	```

2. **Go into the root of the proyect** with the next line:
	```shell
	$ cd [proyect-name]
	```

3. **Run Composer**
	```shell
	# @ root-folder/
	$ composer install --ignore-platform-reqs
	```

4. **Run Gulp watch**
	```shell
	# @ root-folder/
	$ gulp watch
	```
