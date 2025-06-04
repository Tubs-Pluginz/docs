# Frequently Asked Questions (FAQ) ❓

Find answers to common questions about Tub's Status Plugin.

::: tip Pro Tip!
Before asking, ensure you've checked:
1.  The latest plugin version.
2.  Your `config.yml` for errors (use a YAML validator).
3.  Server console logs for `[TSP]` messages, especially with `loggerLevel: 10` (DEBUG) in `config.yml`.
The [Troubleshooting Guide](./troubleshooting.md) is also a great resource!
:::

<details>
  <summary><b>Q: How do I use color codes or formatting in my status?</b></summary>
  You can use standard Minecraft `&` codes if you have the appropriate `StatusPlugin.formatting. &lttype&gt` permission (e.g., `StatusPlugin.formatting.color`, `StatusPlugin.formatting.bold`). For example:

  *   `&c` for Red, `&a` for Green, `&l` for Bold, `&o` for Italic.
  *   To set a status like "&cImportant &lNotice", you would type: `/status &cImportant&_&lNotice`
  *   Use `&_` to represent a space, as regular spaces might be trimmed by the command parser depending on your setup.
  *   View all codes with `/tsp help colorcodes`.
</details>

<details>
  <summary><b>Q: My status is getting cut off. Why?</b></summary>
  This is likely due to the `maxStatusLength` setting in `config.yml` (default is 15 characters). This limit applies to the *displayed* characters, not including color codes or PlaceholderAPI placeholders. An admin can change this limit with `/tsp setmaxlength &ltlength&gt`.
</details>

<details>
  <summary><b>Q: Why isn't my status showing up in the tab list or chat?</b></summary>
  Check these settings in `config.yml`:

  *   `changeTablistNames: true` (for tab list display)
  *   `chatFormatter: true` (for status in chat messages)
  If these are true and it's still not working, ensure no other plugin is overriding tab list or chat formatting with higher priority. Also, tab list updates might sometimes require a player relog or server restart to fully propagate for all clients. The plugin does attempt to refresh tab names periodically (every 30 seconds). Check console for errors and ensure you have permissions to set a status.
</details>

<details>
  <summary><b>Q: Can I use PlaceholderAPI placeholders in my status?</b></summary>
  Yes! If PlaceholderAPI is installed on your server and you have the `StatusPlugin.placeholders` permission, you can include PAPI placeholders from *other* plugins in your status message (e.g., `/status My balance: %vault_eco_balance%`). These will be parsed and displayed.
</details>

<details>
  <summary><b>Q: How does the LuckPerms prefix/suffix integration work?</b></summary>
  If LuckPerms is installed and you have the `StatusPlugin.placeholders` permission, you can use `%LP_prefix%` and `%LP_suffix%` in your status message. The plugin will replace these with your current LuckPerms prefix and suffix. For example: `/status %LP_prefix%&7MyText&f%LP_suffix%`.
</details>

<details>
  <summary><b>Q: What is "Group Mode" and how do I use it?</b></summary>
  If `groupMode: true` is set in `config.yml`:

  *   Players (unless admins) cannot set custom statuses with `/status &ltmessage&gt`.
  *   They must choose a status from predefined groups using `/status &ltgroupname&gt`.
  *   Groups are defined in `config.yml` under `statusGroups`, each with a `status` and an optional `permissions` list.
  *   To use a group, a player needs `StatusPlugin.group.set` AND either one of the permissions in the group's `permissions` list (if defined and not empty) OR just `StatusPlugin.group.set` if the group has no specific permissions list. See the [Configuration Guide](./configuration.md#statusgroups) for details.
</details>

<details>
  <summary><b>Q: How do group permissions work exactly?</b></summary>

  1.  To use the `/status &ltgroupname&gt` command, a player needs the base `StatusPlugin.group.set` permission (default: true).
  2.  For a *specific group* (e.g., `vip_group` defined in `config.yml`):
      *   If `statusGroups.vip_group.permissions` is defined in `config.yml` and contains permissions like `['my.vip.perm']`, the player needs `my.vip.perm` (or any other permission from that list).
      *   If `statusGroups.vip_group.permissions` is *not* defined, or is an empty list `[]`, then having `StatusPlugin.group.set` is sufficient to use `vip_group`.
  Admins with `StatusPlugin.admin.setStatus` can set any group for any player, bypassing the target's permission checks for groups.
</details>

<details>
  <summary><b>Q: What's the difference between `/status` and `/tsp`?</b></summary>

  *   `/status`: Primarily for players to manage their own status (e.g., `/status &ltmessage&gt`, `/status &ltgroupname&gt`, `/status remove`). Admins can also use it to manage *other* players' statuses (e.g., `/status &ltplayer&gt &ltmessage&gt`). Player-only command.
  *   `/tsp`: Primarily for plugin administration (e.g., `/tsp reload`, `/tsp setmaxlength`, `/tsp info`, `/tsp help`). It also offers admin commands to manage other players' statuses (e.g., `/tsp setstatus &ltplayer&gt &ltmessage&gt`, `/tsp remove &ltplayer&gt`) and can be used from the console.
</details>

<details>
  <summary><b>Q: Do statuses save if the server restarts?</b></summary>
  Yes, player statuses are saved to `plugins/TubsStatusPlugin/statuses.yml` and are reloaded when the server starts or when `/tsp reload` is used.
</details>

<details>
  <summary><b>Q: How often do PlaceholderAPI placeholders in statuses update in the tab list?</b></summary>
  The plugin schedules a task to refresh player display names (which includes parsing PAPI placeholders in statuses) in the tab list approximately every 30 seconds (600 game ticks) by default if `changeTablistNames: true`.
</details>

<details>
  <summary><b>Q: What if I use a color code I don't have permission for?</b></summary>
  The `StatusManager` attempts to strip formatting codes for which the player does not have the corresponding `StatusPlugin.formatting.&lttype&gt` permission. For example, if you try to use `&c` (red) without `StatusPlugin.formatting.color`, the `&c` will be removed, and the text will appear in the default color or the last permitted color.
</details>

---

Still stuck? Visit our [community discord](https://discord.pluginz.dev) for help!