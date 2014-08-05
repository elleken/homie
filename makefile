#
# $Id: makefile 9 2013-05-02 14:18:09Z akikar $
#
# Bootstrap file for Grunt task runner. 
# 
# Makes sure we have both Grunt and its dependencies available.
# Checks for substring `grunt v` in version string and if not found, installs 
# Grunt locally. Otherwise, only install the dependencies as Grunt is already 
# installed. 
#
# To use on a local development machine, run `sudo make dev`. 
# To use on Jenkins Continuous Integration server, run `make dist`. 
# (On local machine, run `sudo make dist`).
# 
#


# Get the grunt version string. This returns something like 
# `grunt-cli v0.1.7 grunt v0.4.1`.
grunt_available = $(shell grunt --version)


# Install grunt and its required dependencies in local directory. 
install: 
ifneq (grunt v, $(findstring grunt v,$(grunt_available)))
	npm install grunt
	npm install
else
	npm install
endif


# Initialize the dev watch environment.
trigger-dev:
	grunt


# Initialize the optimized distribution for deployment.
trigger-dist:
	grunt dist


# Call one of these to trigger either the dev (local machine) or dist (Jenkins) 
# process. 
dev: install trigger-dev
dist: install trigger-dist