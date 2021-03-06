This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myTabs tabs
```

Then, to run it, cd into `myTabs` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Generate for prod:

```bash
$ ionic cordova build android --prod --release -- -- --minSdkVersion=19
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release-key-pideExpress.keystore app-release-unsigned.apk pideExpress
$ zipalign -v 4 app-release-unsigned.apk pideExpress.apk
LOCAL
$ cd /Users/elkinurango/Library/Android/sdk/build-tools/28.0.3
./zipalign -v 4 /Users/elkinurango/Desktop/pidexpress/merca-app/app-release-unsigned.apk /Users/elkinurango/Desktop/pidexpress/merca-app/pideExpress.apk
```

Substitute ios for android if not on a Mac.

