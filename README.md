# PostHog OctoLane Plugin

This is a PostHog plugin that integrates with [OctoLane](https://www.octolane.com) to enrich IP, company, and people data for PostHog events.

## Features
- Enriches PostHog events with OctoLane data.
- Configurable via the PostHog UI with your OctoLane API key.

## IP Address Detection

This plugin prefers to use event property $ip (which should be of type string), but if that is not provided, it uses the IP address of the client that sent the event. This way in most cases the plugin can infer the IP address without any work on your side.

## Properties

The following properties can be added to the event if its IP address can be matched to a OctoLane location:

- octolaneApiKey: string

## Installation

1. Visit 'Project Plugins' under 'Settings'
2. Enable plugins if you haven't already done so
3. Click the 'Repository' tab next to 'Installed'
4. Click 'Install' on this plugin
5. Add your [Octolane API key](https://app.octolane.com/settings) at the configuration step
5. Enable the plugin

## Configuration

The plugin requires your [OctoLane API key](https://app.octolane.com/settings) for authentication. You can find this key in your OctoLane account settings.

## License 

![License: MIT](https://img.shields.io/badge/License-MIT-red.svg?style=flat-square)

This project is licensed under the MIT License. See the LICENSE file for details.