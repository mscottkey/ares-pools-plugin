# Pools

## Credits
Developed by Avarice @ Ares Central. Design input from Blu and Roadspike @ Ares Central

## Overview

The Pools system is a generic point tracker that can be used for any character driven pool. Generally it was designed with Energy reserves in mind. You can spend points, add points, and show your point pool to the room/scene. Other commands allow you to take desperate measures, reducing your pool to 0 (or negative) for one large effect (like a last ditch effort). 

Pools can be used for whatever you like generally. The config file allows for naming your pools (ie: Energy or Reserves), setting the attribute that pools will use for pool/reset (along with a multiplier) and other options. Most pool commands emit to the scene or room you are in and spends/adds require a reason. 

Please note that pools are character based, meaning that you need to keep track of what your pool is set to across multiple scenes.

## Installation

1. In the game, run `plugin/install <github url>`.

## CSS

The Pools code adds 4 commands to your Play Menu. To make this easier to manage, I've nested them into a menu/submenu structure in the plugin. To support this, please copy the CSS below into your Custom CSS file in the web portal:

``` CSS
.dropdown-menu li {
position: relative;
}
.dropdown-menu .dropdown-submenu {
display: none;
position: absolute;
left: 100%;
top: -7px;
}
.dropdown-menu .dropdown-submenu-left {
right: 100%;
left: auto;
}
.dropdown-menu > li:hover > .dropdown-submenu {
display: block;
}
```
NOTE: If you don't want to use the nested menus, you will need to customize the live-scene-custom-play.hbs file to remove the nesting. If you are unsure of how to do this, please ask.

## Web Portal

Pools can be managed from the Play menu in scene. To enable this, you need to do the following:

1. Go to .../ares-webportal/app/templates/components
2. Open live-scene-play-custom.hbs
3. Insert the line below into the file:

``` HTML
<LiveScenePools @scene={{this.scene}} />
```

4. Save the file
5. website/deploy

## Web Portal - Change Pools to something else

If you want the word Pools replaced with whatever you call this resource (Reserves, Mana, Blood, etc), then you will need to edit the live-scene-pools.hbs file as shown below. 

NOTE: DO NOT change anything inside of {{action ...}}, you will break the functionality. You just want to change the >Pool Command</a> part.

``` html
<li> <a class="dropdown-item" href="#">
        Pools &raquo;
      </a>
      <ul class="dropdown-menu dropdown-submenu">
        <li><a class="dropdown-item" href="#" {{action 'desperatePool'}} class="dropdown-item">Pool: Desperate</a></li>
        <li><a class="dropdown-item" href="#" {{action (mut this.selectSpendPool) true}} class="dropdown-item">Spend Pool</a></li>
        <li><a class="dropdown-item" href="#" {{action (mut this.selectAddPool) true}} class="dropdown-item">Add Pool</a></li>
        <li><a class="dropdown-item" href="#" {{action 'resetPool'}} class="dropdown-item">Reset Pool</a></li>
        <li><a class="dropdown-item" href="#" {{action 'showPool'}} class="dropdown-item">Show Pool</a></li>
      </ul>
</li>
```


And here (Only modify @title):

``` HTML
<BsModalSimple @title="Spend Pool Points" @closeTitle="Cancel" @submitTitle="Spend" @size={{null}} @fade={{true}} @open={{this.selectSpendPool}} @onSubmit={{action "spendPool"}} @onHide={{action (mut this.selectSpendPool) false}}>

Finally here (Only modify @title):

<BsModalSimple @title="Add Pool Points" @closeTitle="Cancel" @submitTitle="Add" @size={{null}} @fade={{true}} @open={{this.selectAddPool}} @onSubmit={{action "addPool"}} @onHide={{action (mut this.selectAddPool) false}}>
```

## Uninstalling

Uninstalling requires some work, please see See [Uninstalling Plugins](https://www.aresmush.com/tutorials/code/extras.html#uninstalling-plugins).

## License

Same as [AresMUSH](https://aresmush.com/license).