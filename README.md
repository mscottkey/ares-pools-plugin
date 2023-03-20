# Pools

## Credits
Developed by Avarice @ Ares Central. Design input from Blu and Roadspike @ Ares Central

## Overview

The Pools system is a generic point tracker that can be used for any character driven pool. Generally it was designed with Energy reserves in mind. You can spend points, add points, and show your point pool to the room/scene. Other commands allow you to take desperate measures, reducing your pool to 0 (or negative) for one large effect (like a last ditch effort). 

Pools can be used for whatever you like generally. The config file allows for naming your pools (ie: Energy or Reserves), setting the attribute that pools will use for pool/reset (along with a multiplier) and other options. Most pool commands emit to the scene or room you are in and spends/adds require a reason. 

Please note that pools are character based, meaning that you need to keep track of what your pool is set to across multiple scenes.

## Installation

1. In the game, run `plugin/install <github url>`.

## Web Portal

Pools can be managed from the Play menu in scene. To enable this, you need to do the following:

1. Go to .../ares-webportal/app/templates/components
2. Open live-scene-play-custom.hbs
3. Inser the line below into the file:

<LiveScenePools @scene={{this.scene}} />

4. Save the file
5. website/deploy

## Uninstalling

Currently not supported.

## License

Same as [AresMUSH](https://aresmush.com/license).