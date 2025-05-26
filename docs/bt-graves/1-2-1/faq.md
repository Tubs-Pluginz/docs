# Frequently Asked Questions (FAQ) ❓

Here are answers to common questions about the BTGraves plugin.

::: tip Check the Basics First!
Many issues can be resolved by:
1.  Ensuring you're on the **latest BTGraves version**.
2.  Double-checking your **`config.yml`** for correct settings.
3.  Reviewing your **server console logs** for messages from `[BTGraves]`.
See the [Troubleshooting Guide](./troubleshooting.md) for more.
:::

**Q: Do graves protect items from lava or explosions?**
<details>
  <summary>Click to expand details</summary>
  Yes!
  *   **Lava/Water:** The grave placement logic tries to find a safe spot above liquids. The `LiquidFlowListener` and `BlockPlaceListener` also prevent liquids from flowing into or being placed directly onto the grave's player head.
  *   **Explosions:** The `BlockExplodeListener` protects the grave's player head block from being destroyed by entity explosions (like creepers or TNT). The items inside are safe within the grave's data.
</details>

**Q: What happens if a player dies in a very tight space or in the void?**
<details>
  <summary>Click to expand details</summary>
  BTGraves attempts to find a suitable 2-block high air space near the death location.
  *   It searches a small radius downwards, then upwards.
  *   If the death occurs below the world's minimum build height (e.g., falling into the void in the Overworld/End, or below Y=0 in the Nether), it will try to place the grave at Y=minY+1 (e.g., Y=1 in Nether/End, Y=-63 in Overworld).
  *   If no suitable air pocket is found after these checks, the grave might be placed at the original death location, potentially overwriting non-solid blocks or being partially embedded if space is extremely limited. The goal is always to place the grave.
</details>

**Q: How much XP is saved? Can I change it?**
<details>
  <summary>Click to expand details</summary>
  By default, 100% of the player's XP (both levels and progress to the next level) is saved. You can change this using the `expPercentage` setting in `config.yml`. Set it to a value between `0` (save no XP) and `100` (save all XP).
</details>

**Q: What happens when a grave expires (`graveTimeout`)?**
<details>
  <summary>Click to expand details</summary>
  If `graveTimeout` is set to a positive number (minutes):
  1.  The grave's internal timer counts up.
  2.  If the timer exceeds the `graveTimeout`, the grave is marked as "expired".
  3.  **Crucially, for the items to drop, a player must be within a 50-block radius of the expired grave, AND the chunk containing the grave must be loaded.**
  4.  When these conditions are met, all items from the grave and the saved XP (as orbs) are dropped at the grave's location. The player head and armor stand are then removed.
  If `graveTimeout` is `-1`, graves never expire.
</details>

**Q: Can other players access my grave?**
<details>
  <summary>Click to expand details</summary>
  -   **By default, no.** Only the player who died (the owner of the grave) can open their grave by right-clicking its armor stand. <br>
  -   **Admins:** Players with the `btgraves.admin.open` permission can use the `/grave open < graveId>` command to open any grave if they know its ID.
</details>

**Q: What if the server crashes or restarts while graves are active?**
<details>
  <summary>Click to expand details</summary>
  BTGraves saves active grave data to `graves.yml` periodically (every 10 seconds by default) and when the plugin is disabled. When the server restarts and BTGraves loads, it reads `graves.yml` to restore active graves, including their contents, locations, and timers. This ensures persistence across restarts.
</details>

**Q: Does BTGraves work with `keepInventory = true` gamerule?**
<details>
  <summary>Click to expand details</summary>
  No. If the `keepInventory` gamerule is set to `true` in a world, players will not drop items or XP upon death, so BTGraves will not create a grave for them in that world. BTGraves is designed for servers where `keepInventory` is `false`.
</details>

**Q: How is the grave's remaining time displayed?**
<details>
  <summary>Click to expand details</summary>
  If a player is within a 50-block radius of an active (non-expired) grave, the grave's armor stand name tag will dynamically update to show the remaining time (e.g., "PlayerName's Grave - 00h 58m 12s"). The time is colored:
  *   **Green:** Plenty of time left.
  *   **Gold/Yellow:** Time is about halfway through.
  *   **Red:** Nearing expiration.
  This update happens roughly every second if a player is nearby.
</details>

**Q: Can I disable the player head for graves? Or change the grave block?**
<details>
  <summary>Click to expand details</summary>
  Currently, BTGraves always places a player head (skinned to the deceased player) and uses an invisible armor stand. There isn't a configuration option to change the grave block or disable the head in the provided version.
</details>

---

If your question isn't answered here, please check the [Troubleshooting Guide](troubleshooting.md) or join our [Discord Community](https://discord.pluginz.dev) for further assistance!
