oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ra-protocol
$ ra-protocol COMMAND
running command...
$ ra-protocol (--version)
ra-protocol/0.0.0 darwin-x64 node-v14.18.1
$ ra-protocol --help [COMMAND]
USAGE
  $ ra-protocol COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ra-protocol hello PERSON`](#ra-protocol-hello-person)
* [`ra-protocol hello world`](#ra-protocol-hello-world)
* [`ra-protocol help [COMMAND]`](#ra-protocol-help-command)
* [`ra-protocol plugins`](#ra-protocol-plugins)
* [`ra-protocol plugins:install PLUGIN...`](#ra-protocol-pluginsinstall-plugin)
* [`ra-protocol plugins:inspect PLUGIN...`](#ra-protocol-pluginsinspect-plugin)
* [`ra-protocol plugins:install PLUGIN...`](#ra-protocol-pluginsinstall-plugin-1)
* [`ra-protocol plugins:link PLUGIN`](#ra-protocol-pluginslink-plugin)
* [`ra-protocol plugins:uninstall PLUGIN...`](#ra-protocol-pluginsuninstall-plugin)
* [`ra-protocol plugins:uninstall PLUGIN...`](#ra-protocol-pluginsuninstall-plugin-1)
* [`ra-protocol plugins:uninstall PLUGIN...`](#ra-protocol-pluginsuninstall-plugin-2)
* [`ra-protocol plugins update`](#ra-protocol-plugins-update)

## `ra-protocol hello PERSON`

Say hello

```
USAGE
  $ ra-protocol hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.0.0/dist/commands/hello/index.ts)_

## `ra-protocol hello world`

Say hello world

```
USAGE
  $ ra-protocol hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ ra-protocol hello world
  hello world! (./src/commands/hello/world.ts)
```

## `ra-protocol help [COMMAND]`

Display help for ra-protocol.

```
USAGE
  $ ra-protocol help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ra-protocol.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.18/src/commands/help.ts)_

## `ra-protocol plugins`

List installed plugins.

```
USAGE
  $ ra-protocol plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ra-protocol plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.6/src/commands/plugins/index.ts)_

## `ra-protocol plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ra-protocol plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ ra-protocol plugins add

EXAMPLES
  $ ra-protocol plugins:install myplugin 

  $ ra-protocol plugins:install https://github.com/someuser/someplugin

  $ ra-protocol plugins:install someuser/someplugin
```

## `ra-protocol plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ ra-protocol plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ ra-protocol plugins:inspect myplugin
```

## `ra-protocol plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ra-protocol plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ ra-protocol plugins add

EXAMPLES
  $ ra-protocol plugins:install myplugin 

  $ ra-protocol plugins:install https://github.com/someuser/someplugin

  $ ra-protocol plugins:install someuser/someplugin
```

## `ra-protocol plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ ra-protocol plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ ra-protocol plugins:link myplugin
```

## `ra-protocol plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ra-protocol plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ra-protocol plugins unlink
  $ ra-protocol plugins remove
```

## `ra-protocol plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ra-protocol plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ra-protocol plugins unlink
  $ ra-protocol plugins remove
```

## `ra-protocol plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ra-protocol plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ra-protocol plugins unlink
  $ ra-protocol plugins remove
```

## `ra-protocol plugins update`

Update installed plugins.

```
USAGE
  $ ra-protocol plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
