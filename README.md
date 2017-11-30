# StyLivJek

Jeckyll boilerplate with support for:

* Stylus
* Livereload

## Install ruby dependencies

* `bundle install`
  * permission problems ? `bundle install --path ./vendor/bundle/`


## Install chrome necessary extensions

* Install chrome extension [link](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)
* Activate the extension by clicking on the Livereload icon in the browser

## Run dev mode
* `bundle exec jekyll liveserve`
  * using vscode there is the task LiveServe

## Deploy with travis-ci

When merging on master branch it will deploy the resultant build.

## Deploy manually 

* `jekyll build`
* drop `./_site` where you need