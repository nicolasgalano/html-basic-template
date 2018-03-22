## Overview
This is a blank template for each project that uses Bootstrap, Sass, Pug (ex-Jade) and Gulp, following MVCSS [Modular View CSS] architecture.


## Requirements

* Node - [Install](https://nodejs.org/en/download/)
* npm - [Install](https://docs.npmjs.com/getting-started/installing-node)


## Resources

- [MVCSS](http://mvcss.io/)
- [Bootstrap(Sass)](https://getbootstrap.com/docs/4.0/getting-started/download/#npm)
- [Pug](https://www.npmjs.com/package/gulp-pug)
- [Sass](https://www.npmjs.com/package/gulp-sass)
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
- [Gulp-PostCSS](https://www.npmjs.com/package/gulp-postcss)
- [Jquery](http://api.jquery.com/)
- [Jquery Validation](https://jqueryvalidation.org/documentation/)
- [KSS styleguide Comments](https://github.com/kneath/kss/blob/master/SPEC.md)

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

4. **Run Gulp serve**
	```shell
	# @ root-folder/
	$ gulp serve
	```

5. **KSS styleguide**
    Please refer to [https://github.com/kneath/kss](https://github.com/kneath/kss/blob/master/SPEC.md) to check the comments synthax, styleguide structure and more details about KSS. 
    
    Ideally you should get used to add kss comments as part of frontend developing process to avoid repetitive tasks. So _while_ you are developing you are *also* creating the styleguide for your project :)

    In a nutshell, the process is as follows:
    - Add kss comments to your scss files.
        - Please note, some basic comments are already added to our biolerplate project, so you can follow those as an example and then simply extend them.
    - Once you are ready to watch your changes, simply run:
        ```bash
	    @project-directory/
	    $ gulp styleguide
	    ```
    That command will build the styleguide based on our builder templates and your kss comments. The Styleguide will be built in `/project-dir/styleguide` so just point your browser to http://_local.host_/styleguide and... magia!
    
    Those are the basics. There are a few more options here:
    ```bash
	   @project-directory/
	   $ gulp watch
	 ``` 
	 Will 'watch' your changes in scss and will refresh the app.css file **AND** the styleguide.
    ``` 
    $ gulp watch:ls 
     ```
    Same as above, but will also run the **sass lint checker** \\0/
    
    @TODO: add styleguide linter to check for errors in comments
    
    node-kss also ships with a homepage.md markdown file which acts as the homepage for your styleguide. Yoy should find it under `/project-dir/src/sass/homepage.md`. Feel free to edit it. 
