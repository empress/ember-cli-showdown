# Changelog

## Release (2025-09-26)

* ember-cli-showdown 9.0.2 (patch)

#### :bug: Bug Fix
* `ember-cli-showdown`
  * [#155](https://github.com/empress/ember-cli-showdown/pull/155) remove ember-source from peer dependencies ([@mansona](https://github.com/mansona))

#### :house: Internal
* `ember-cli-showdown`
  * [#152](https://github.com/empress/ember-cli-showdown/pull/152) fix lttf dashboard action - install pnpm ([@mansona](https://github.com/mansona))
  * [#153](https://github.com/empress/ember-cli-showdown/pull/153) Update pnpm ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))
## Release (2024-03-08)

ember-cli-showdown 9.0.1 (patch)

#### :bug: Bug Fix
* `ember-cli-showdown`
  * [#147](https://github.com/empress/ember-cli-showdown/pull/147) fix peer dependency ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))
## Release (2024-02-07)

ember-cli-showdown 9.0.0 (major)

#### :boom: Breaking Change
* `ember-cli-showdown`
  * [#144](https://github.com/empress/ember-cli-showdown/pull/144) drop support for node 16 ([@mansona](https://github.com/mansona))

#### :rocket: Enhancement
* `ember-cli-showdown`
  * [#143](https://github.com/empress/ember-cli-showdown/pull/143) update showdown to v2 ([@mansona](https://github.com/mansona))

#### :house: Internal
* `ember-cli-showdown`
  * [#141](https://github.com/empress/ember-cli-showdown/pull/141) update to v5.4 with ember-cli-update ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))
## Release (2024-02-07)

ember-cli-showdown 8.1.0 (minor)

#### :rocket: Enhancement
* `ember-cli-showdown`
  * [#139](https://github.com/empress/ember-cli-showdown/pull/139) feat: allow passing in html attributes like class ([@colenso](https://github.com/colenso))

#### :memo: Documentation
* `ember-cli-showdown`
  * [#138](https://github.com/empress/ember-cli-showdown/pull/138) Update README.md to reflect the changes in 8.0.0 ([@SanderKnauff](https://github.com/SanderKnauff))

#### Committers: 2
- Sander Knauff ([@SanderKnauff](https://github.com/SanderKnauff))
- [@colenso](https://github.com/colenso)
## Release (2024-01-19)

ember-cli-showdown 8.0.0 (major)

#### :boom: Breaking Change
* `ember-cli-showdown`
  * [#136](https://github.com/empress/ember-cli-showdown/pull/136) drop support for Ember < 3.16 ([@mansona](https://github.com/mansona))

#### :rocket: Enhancement
* `ember-cli-showdown`
  * [#131](https://github.com/empress/ember-cli-showdown/pull/131) Convert to Glimmer component ([@jaredgalanis](https://github.com/jaredgalanis))

#### :house: Internal
* `ember-cli-showdown`
  * [#135](https://github.com/empress/ember-cli-showdown/pull/135) update lint-to-the-future dashboard action ([@mansona](https://github.com/mansona))
  * [#132](https://github.com/empress/ember-cli-showdown/pull/132) setup release-plan ([@mansona](https://github.com/mansona))
  * [#129](https://github.com/empress/ember-cli-showdown/pull/129) add lint-to-the-future dashboard ([@mansona](https://github.com/mansona))

#### Committers: 2
- Chris Manson ([@mansona](https://github.com/mansona))
- Jared Galanis ([@jaredgalanis](https://github.com/jaredgalanis))

v7.0.0 / 2023-07-02
==================

* update to v4.12 with ember-cli-update #128 from @mansona
* use ember-auto-import to import showdown #126 from @mansona
* breaking: drop support for node &lt; 16 #127 from @mansona

v6.0.1 / 2021-12-07
==================
* feat: Import htmlSafe from @ember/template, not @ember/string. #107 from @muziejus

v6.0.0 / 2021-09-15
==================
* breaking: Drop support for Ember &lt; 3.12 and update to 3.28 using ember-cli-update #106 from @mansona

v5.0.0 / 2021-09-15
==================
* Add auto-changelog system and backfill existing changelog #105 from @mansona
* update from 2.18 to 3.12 using ember-cli-update #104 from @mansona
* breaking: drop node &lt; 12 support and reset using ember-cli-update --to 2.18 --reset #103 from @mansona
* GitHub actions #101 from @mansona
* fix deprecation warning - adding `this.` #96 from @stukalin

v4.5.0 / 2020-04-04
==================
* Update showdown #70 from @NullVoxPopuli

v4.4.4 / 2018-06-20
==================

v4.4.3 / 2018-06-20
==================
* move ember-cli to devDependencies #67 from @jakesjews

v4.4.2 / 2018-05-17
==================

v4.4.1 / 2018-05-17
==================

v4.4.0 / 2018-05-17
==================
* feat: Adding assertion for testing ember-cli &gt;= 2.16.0. #65 from @jasonmit

v4.3.0 / 2018-04-25
==================

v4.2.1 / 2018-03-15
==================

v4.2.0 / 2018-03-14
==================

v4.1.1 / 2017-12-06
==================
* Remove sourceMappingURL for showdown #60 from @Dhaulagiri

v4.1.0 / 2017-08-30
==================
* use new modules syntax #57 from @Dhaulagiri

v4.0.1 / 2017-08-25
==================

v4.0.0 / 2017-08-25
==================
* BREAKING: rewrite fastboot implementation to use the AMD module bundl… #56 from @jasonmit

v3.2.2 / 2017-06-27
==================

v3.2.1 / 2017-05-31
==================

v3.2.0 / 2017-05-23
==================
* Initial commit to support breaking ember-cli-fastboot rc changes #52 from @jasonmit

v3.1.2 / 2017-05-21
==================
* Include showdown sourcemap in the treeForVendor funnel #50 from @jasonmit
* Set repository URL in package.json #48 from @pgengler

v3.1.1 / 2017-05-03
==================
* Removing the need for inline precompile to be a dependency #47 from @jasonmit

v3.1.0 / 2017-05-02
==================
* Upgrading ember addon to latest set of ember-cli dependencies #45 from @jasonmit
* Pull in showdown from NPM rather than bower. #43 from @john-griffin

v2.11.0 / 2017-02-01
==================
* Adding support for global options #36 #42 from @jasonmit

v2.10.0 / 2017-01-17
==================
* Modification of index.js included hook to retrieve the parent application #41 from @3tarazona

v2.9.0 / 2016-12-07
==================
* Fix for #38 GitHub code blocks are rendered incorrectly #40 from @lolmaus
* package.json: Add `showdown` to `fastbootDependencies` #32 from @lolmaus
* converter as cp that is recomputed only when extensions change #37 from @jasonmit
* Update included hook for nested addons #27 from @GreatWizard
* Readme: fixed link to Showdown extensions #33 from @lolmaus

v2.8.0 / 2016-09-15
==================
* Remove deprecated Handlebars.Safestring usage #30 from @Dhaulagiri
* Bumping showdown bower package to latest version #28 from @ynnoj
* Supporting used as a nested addon #26 from @jasonmit

v2.7.2 / 2016-06-24
==================
* Fix deprecation warning #24 from @jasonmit

v2.7.1 / 2016-06-20
==================
* Moving deps from devdeps #22 from @jasonmit

v2.7.0 / 2016-06-17
==================
* Fastboot support #20 from @jasonmit
* Revert "Only import the jQuery plugin outside of fastboot" #19 from @jasonmit

v2.6.0 / 2016-06-16
==================
* Adding positional params, space separated extensions #18 from @jasonmit
* Fix typo #15 from @HeroicEric
* Only import the jQuery plugin outside of fastboot #17 from @Dhaulagiri
* more verbose showdown extension recommendations #14 from @kybishop

v2.5.0 / 2015-09-23
==================
* Adds support for Showdown Extensions #11 from @nikz

v2.4.0 / 2015-09-02
==================
* Support showdown options #9 from @joshuaclayton

v2.3.0 / 2015-08-29
==================
* feat: update ember-cli #10 from @dylanfoster

v2.2.1 / 2015-06-29
==================

v2.2.0 / 2015-05-31
==================
* Update README.md #3 from @jpadilla
