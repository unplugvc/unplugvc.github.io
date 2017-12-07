# Made with StyLivJek

## Install ruby

* Required version is `ruby 2.4.2p198`

## Install ruby dependencies

* `bundle install`
  * permission problems ? `bundle install --path ./vendor/bundle/`


## Install chrome necessary extensions

* Install chrome extension [link](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)
* Activate the extension by clicking on the Livereload icon in the browser

## Run with the admin (for content editors)

* `bundle exec jekyll serve --watch`

## Run dev mode (developers)
* `bundle exec jekyll liveserve`
  * using vscode there is the task LiveServe

## Deploy with travis-ci

When merging on master branch it will deploy the resultant build.

## Deploy manually 

* `jekyll build`
* drop `./_site` where you need

## Modify data

Use jekyll-admin to modify the data `http://localhost:4000/admin`

* Go in the `Data Files` section
* In the right column click on the `Switch View to GUI Editor` orange button to toggle a more readable UI


### Current event

* Dev
  * The first element in the json *events.json* is the current event, 
  * If you need to modify it just modify the values or ad new elements (es.: new activity in *program*)
  * To create a new current event just copy&modify the old current event and put it at the first position in the json.