# Troubleshooting Guide 🛠️

If you're experiencing issues with BTGraves, this guide provides steps to help diagnose and resolve them.

## 1. Essential First Steps ✅

*   **Latest BTGraves Version:** Ensure you are using the most recent release of BTGraves. Check the [Modrinth Page](https://modrinth.com/plugin/bt-graves) for updates.
*   **Server Version:** BTGraves `1.2.1` is built for API version `1.13`. While it may work on newer versions (1.13+), compatibility is best with versions around its target. Significant Minecraft updates could introduce breaking changes.
*   **Console Logs:** This is your best friend! Carefully examine your server console logs (e.g., `logs/latest.log`) for any error messages or warnings prefixed with `[BTGraves]` or related to the plugin.
*   **`config.yml` Check:** Double-check your `plugins/BTGraves/config.yml` for any typos, incorrect values, or formatting errors. When in doubt, back up your current config and let the plugin generate a fresh one to compare.

## 2. Common Issues & Solutions

### A. Graves Not Being Created

::: details Symptoms & Checklist
**Symptoms:**
*   Player dies, items drop normally (or disappear if `keepInventory` is false), but no grave/player head appears.
*   No message about grave creation is sent to the player.

**Checklist:**
1.  **`keepInventory` Gamerule:** Is the `gamerule keepInventory` set to `false` in the world where the player died? BTGraves will not activate if `keepInventory` is `true`.
2.  **Player Has Items:** Did the player actually have items in their inventory, armor, or off-hand? Graves are only created if there's something to save (excluding XP if `expPercentage` is 0).
3.  **Console Errors:** Check the console *at the time of player death* for any errors from BTGraves. There might be issues with finding a suitable location, spawning the armor stand, or saving grave data.
4.  **World Protection / Region Plugins:** Do you have other plugins (e.g., WorldGuard, GriefPrevention, Towny) that might be preventing block placement (the player head) or entity spawning (the armor stand) in the death area, even for plugins?
    *   Try testing in an unprotected area.
    *   You may need to configure those plugins to allow BTGraves to function (e.g., by adding a flag or trusting the plugin's fake player if it uses one for placement, though BTGraves seems to place directly).
5.  **Plugin Conflict:** While rare, another plugin modifying death events with high priority could interfere. Try temporarily removing other death-related plugins to test.
6.  **Server Version Compatibility:** If you're using a very new or very old Minecraft version relative to the plugin's `api-version` (1.13), there could be underlying API incompatibilities.
:::

### B. Cannot Open Grave / Grave GUI Doesn't Appear

::: details Symptoms & Checklist
**Symptoms:**
*   Player right-clicks where the grave should be (or the player head), but nothing happens.
*   `/grave open <graveId>` command fails for admins.

**Checklist:**
1.  **Ownership:** Is the player trying to open the grave its original owner? Only the owner can open it by right-clicking.
2.  **Armor Stand Existence:** The interactive part of the grave is an invisible armor stand. Has it been accidentally removed by another plugin or command (e.g., `/kill @e[type=armor_stand]`)?
    *   Check `graves.yml` to see if the grave data still exists. If it does but the armor stand is gone, the grave is effectively broken for interaction.
3.  **Correct Grave ID (for admin command):** If using `/grave open <graveId>`, ensure the UUID is correct and the grave hasn't expired and been removed.
4.  **Plugin Enabled:** Is BTGraves still enabled and running (`/plugins`)?
5.  **Console Errors:** Check for errors when the interaction or command attempt occurs.
:::

### C. Grave Items/XP Not Restoring Correctly

::: details Symptoms & Checklist
**Symptoms:**
*   Player clicks "Restore Items" in GUI, but not all items return, or XP isn't correct.
*   Items are dropped instead of going into inventory.

**Checklist:**
1.  **Full Inventory:** If the player's inventory is full when they click "Restore Items," any items from the grave that don't have space will be dropped at their feet. This is intended behavior.
2.  **XP Calculation:** The `expPercentage` in `config.yml` determines how much XP is saved. Ensure this is set as intended.
3.  **Console Errors:** Check for errors during the item restoration process.
4.  **`graves.yml` Data:** (Advanced) You could inspect the Base64 item data in `graves.yml` for the specific grave to see if it was saved correctly, though this is complex.
:::

### D. Graves Expiring Too Quickly or Not At All

::: details Symptoms & Checklist
**Symptoms:**
*   Graves disappear much faster than the `graveTimeout` setting.
*   Graves set with a timeout never seem to disappear.

**Checklist:**
1.  **`graveTimeout` Setting (`config.yml`):**
    *   Is the value in minutes, as intended?
    *   Is it set to `-1` (meaning they never expire)?
2.  **Player Proximity & Chunk Loading (for expiration item drop):** For an expired grave's items to drop, a player must be within a 50-block radius, AND the chunk containing the grave must be loaded. If no players are ever near expired graves in loaded chunks, their items won't drop, and the grave entity/head might persist until a manual cleanup or next load.
3.  **Server Time/Ticks:** Ensure your server's ticking is stable. Severe server lag *could* theoretically affect timed tasks, though Bukkit's scheduler is usually robust.
4.  **`graves.yml` `activeTime` vs `maxActiveTime`:** (Advanced) You can inspect these values for a specific grave in `graves.yml` to see its current timer status.
:::

### E. Grave Player Heads Not Protected

::: details Symptoms & Checklist
**Symptoms:**
*   Grave player heads are destroyed by explosions, pistons, or liquids.

**Checklist:**
1.  **Listener Conflicts:** It's possible another plugin with higher priority event listeners for block protection or entity explosions is overriding BTGraves's protection. Try testing with minimal other plugins.
2.  **Specific Event Edge Cases:** While BTGraves covers common scenarios, there might be very specific or custom explosion/block manipulation events from other plugins it doesn't account for.
3.  **Console Errors:** Check for errors from BTGraves's listener classes during such events.
:::

## 3. Providing Information for Support 🆘

If you've tried these steps and are still facing issues, please seek assistance! The best place is our [Discord Community](https://discord.pluginz.dev).

When asking for support, please provide:

*   **BTGraves Version:** (e.g., `1.2.1`)
*   **Server Software & Version:** (e.g., Paper 1.19.4, Spigot 1.18.2)
*   **Java Version:** (Output of `java -version` in your server's terminal)
*   **Your `config.yml` for BTGraves.**
*   **(If relevant) A snippet of your `graves.yml` for a problematic grave.**
*   **Detailed Console Logs:** Copy relevant sections from your server console (e.g., `logs/latest.log`) when the issue occurs. Use a service like [Pastebin](https://pastebin.com/), [Hastebin](https://hastebin.com/), or [mclo.gs](https://mclo.gs/). **Do not paste long logs directly into Discord.**
*   **A Clear Description of the Issue:**
    *   What did you expect to happen?
    *   What actually happened?
    *   Were there any specific error messages shown to players or in the console?
*   **Steps to Reproduce the Issue:** If you can reliably make it happen, list the steps.

The more information you provide, the easier it will be to help you!
