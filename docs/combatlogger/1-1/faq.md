# Frequently Asked Questions (FAQ) ❓

Common questions about BT's CombatLogger.

::: tip Check the Basics First!
Before diving deep, ensure:
1.  You're on the **latest BT's CombatLogger version**.
2.  Your **`config.yml`** is correctly set up.
3.  You've checked **server console logs** for `[BTCL]` messages.
See the [Troubleshooting Guide](./troubleshooting.md) for more.
:::

<details>
  <summary><b>Q: Does this plugin prevent players from using commands like `/home` or `/spawn` while in combat?</b></summary>
  No. BT's CombatLogger, in its current version (1.1-beta based on provided code), primarily focuses on punishing players who **log out** while in combat by killing them. It does not inherently block command usage during combat. If you need command blocking during combat, you would typically need another plugin that specializes in combat management or command control, or a custom solution.
</details>

<details>
  <summary><b>Q: What happens if a player's game crashes or they lose internet connection while in combat?</b></summary>
  The plugin cannot distinguish between an intentional logout and an unintentional disconnect (like a crash or internet loss). If a player disconnects for *any reason* while their combat timer is active, they will be penalized (killed) upon their next login or immediately if the server processes the quit fast enough. This is a common approach for combat logging plugins to maintain fairness, as distinguishing intent is technically challenging.
</details>

<details>
  <summary><b>Q: How does the ally system work with combat tagging?</b></summary>
  If two players have successfully allied using `/cl ally add` and mutual acceptance:
  *   Hitting an ally (Player A hits Player B, where A and B are allies) will **not** trigger the combat timer for either Player A or Player B.
  *   Hitting a non-ally will trigger the combat timer as usual for both the attacker and the victim.
  The ally system is designed to allow team play or friendly duels without the risk of combat log penalties from accidental hits on teammates.
</details>

<details>
  <summary><b>Q: Will players be tagged if they are damaged by mobs or the environment (e.g., lava, fall damage)?</b></summary>
  No. BT's CombatLogger specifically tags players based on Player-versus-Player (PvP) interactions. Damage from mobs, fall damage, lava, drowning, etc., will not trigger the combat tag from this plugin.
</details>

<details>
  <summary><b>Q: How long do ally requests last?</b></summary>
  Ally requests sent via `/cl ally add < player>` are valid for **30 seconds**. If the target player does not `/cl ally accept < sender>` or `/cl ally deny < sender>` within that time, the request expires, and they will need to be sent a new request.
</details>

<details>
  <summary><b>Q: Where is ally data stored? Can I edit it manually?</b></summary>
  Ally relationships are stored in the `plugins/CombatLogger/allies.yml` file. This file contains pairs of player UUIDs. While you *could* technically edit it manually (e.g., to remove an old alliance if players are inactive), it's generally recommended to manage allies through the in-game `/cl ally` commands to ensure data integrity. Always back up `allies.yml` before manual edits. The plugin reloads this file with `/cl reload`.
</details>

<details>
  <summary><b>Q: If I change `combatTimeout` in `config.yml` and reload, does it affect players already in combat?</b></summary>
  When you use `/cl reload`, the `ConfigManager` reloads the `combatTimeout` value. <br>
  -   For players who are **newly tagged** after the reload, the new `combatTimeout` will apply.<br>
  -   For players who were **already in combat before the reload**, their existing `CombatTimer` instance was created with the *old* timeout value. Their current timer will continue with its original duration unless they engage in new combat, which would then reset their timer using the *newly loaded* `combatTimeout`.
</details>

<details>
  <summary><b>Q: Does the plugin work with versions below Minecraft 1.13?</b></summary>
  No. Only 1.13 and above are supported. The plugin uses features and APIs introduced in Minecraft 1.13, so it will not function correctly on older versions.
</details>

---

Still have questions? Feel free to ask on our [Community Discord](https://discord.pluginz.dev)!
