# PostHog Octolane Integration App

This PostHog app seamlessly integrates with [Octolane](https://www.octolane.com) to augment PostHog events with detailed IP, company, and individual data, leveraging Octolane's rich datasets.

## Key Features
- Dynamically enriches PostHog events with comprehensive data from Octolane, including detailed company information.
- Easily configurable through the PostHog interface using your Octolane API key, allowing for swift setup and integration.

## IP Address Resolution

- Primary source for IP address data is the $ip event property, expected in string format.
- In the absence of $ip, the app smartly defaults to the client's IP address for event generation, ensuring seamless data capture with minimal setup.

## Properties

Upon successful IP address correlation with OctoLane's database, the following enrichments are possible:

- `octolaneApiKey`: A string type property for enhanced data integration.

## Installation

1. Navigate to 'Browse Apps' under 'APPS' section.
2. Locate the Octolane app using the search functionality.
3. Click the 'Configure' button next to "Octolane" app under "Available Apps".
4. CLick on "Enable" to actvate the app.
5. Add your [Octolane API key](https://app.octolane.com/settings) at the configuration step.
6. Click on "Save" to finalize.

## Configuration

The app requires your [Octolane API key](https://app.octolane.com/settings) for authentication. You can find this key in your Octolane account settings.

## Open Source Contribution and License

![License: MIT](https://img.shields.io/badge/License-MIT-red.svg?style=flat-square)

This project is open source and released under a permissive MIT license. This means you are free to make further contributions or changes to this project, so long as an iriginal copy of the license and copyright information is included with the software.