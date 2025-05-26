# Core Mechanics Explained 🧠

Understanding the inner workings of BT Graves can help you appreciate its features and troubleshoot effectively.

## 1. Grave Creation Process (On Player Death)

When a player dies and the `keepInventory` gamerule is `false`:

1.  **Inventory & XP Capture:**
    *   The plugin captures all items from the player's main inventory, armor slots, and off-hand slot.
    *   It calculates the experience to be saved based on the `expPercentage` setting in `config.yml`. Both full levels and progress to the next level are considered.
2.  **Clear Drops:** The player's default item drops and dropped XP are cleared from the death event to prevent item duplication.
3.  **Find Suitable Location:**
    *   The plugin attempts to find a suitable empty space (2 blocks high air pocket with a solid or liquid block below) at or near the player's death location.
    *   It searches downwards first, then upwards, within a limited range.
    *   It tries to avoid placing graves inside liquids like lava or water, moving the grave upwards if necessary (respecting world height limits, especially in the Nether).
4.  **Grave Entity Spawn:**
    *   An **invisible armor stand** is spawned at the determined location. This armor stand:
        *   Is set to be invulnerable.
        *   Has gravity disabled.
        *   Can be `small` or normal-sized based on the `smallArmorStand` config setting (affecting hitbox and name tag height).
        *   Displays a custom name tag: "`PlayerName`'s Grave - `RemainingTime`".
5.  **Player Head Placement:** A player head block, skinned with the deceased player's skin, is placed at the armor stand's feet location.
6.  **Grave Data Storage:**
    *   A unique `graveId` is generated.
    *   All captured items, armor, off-hand item, saved XP (levels and progress), player name, grave location, armor stand UUID, and `graveTimeout` are stored as a `Grave` object.
    *   This data is managed by `GraveManager` and periodically saved to `graves.yml` by `GravePersistenceManager`.
7.  **Notification & GUI:**
    *   The deceased player receives a message informing them that a grave has been created at their death coordinates.
    *   The grave's inventory GUI is automatically opened for the deceased player, allowing them to immediately decide whether to restore or drop the items.

## 2. Grave Interaction & Inventory GUI

*   **Opening a Grave:**
    *   The **owner** of the grave can open it by right-clicking the invisible armor stand associated with it.
    *   Administrators with the `btgraves.admin.open` permission can use the `/grave open <graveId>` command to open any grave.
*   **GUI Layout (54 slots):**
    *   **Row 1 (Slots 0-3):** Armor (Helmet, Chestplate, Leggings, Boots).
    *   **Row 1 (Slot 8):** Off-hand item.
    *   **Rows 2-4 (Slots 9-35):** Main inventory items (slots 9-35 of player inv).
    *   **Row 5 (Slots 36-44):** Hotbar items (slots 0-8 of player inv).
    *   **Slot 49 (Bottom Middle):** An Experience Bottle item displaying the amount of saved XP levels.
    *   **Slot 45 (Bottom Left):** A Green Stained Glass Pane, labeled "Restore Items".
    *   **Slot 53 (Bottom Right):** A Red Stained Glass Pane, labeled "Drop Items".
*   **GUI Actions:**
    *   **Clicking "Restore Items" (Green Pane):**
        *   Attempts to place all items from the grave GUI directly into the player's corresponding inventory slots.
        *   If a slot in the player's inventory is already occupied, the item from the grave for that slot is dropped at the player's feet.
        *   The saved XP (levels and progress) is added to the player.
        *   The grave (armor stand and player head) is removed from the world, and its data is deleted.
    *   **Clicking "Drop Items" (Red Pane):**
        *   All items from the grave GUI are dropped on the ground at the grave's location.
        *   The saved XP is dropped as experience orbs at the grave's location.
        *   The grave (armor stand and player head) is removed from the world, and its data is deleted.
    *   **Closing the GUI (or clicking other slots):** No action is taken by default; the items remain in the grave. Clicking item slots directly in the GUI is prevented.

## 3. Grave Expiration & Timeout (`graveTimeout`)

*   **Timer:** Each grave has an internal timer that starts when it's created.
*   **`graveTimeout` Config:** This value (in minutes) determines how long a grave lasts. If set to `-1`, graves last indefinitely.
*   **Expiration Logic (`GraveTimeoutManager`):**
    *   A repeating task checks active graves.
    *   If a grave's `activeTime` exceeds its `maxActiveTime` (derived from `graveTimeout`), it's marked as `expired`.
    *   **If an expired grave has a player within a 50-block radius AND the grave's chunk is loaded:**
        *   The grave's contents (items and XP orbs) are dropped at its location.
        *   The grave (armor stand and player head) is removed.
*   **Dynamic Name Tag:** If a player is nearby an active (non-expired) grave, its armor stand name tag is updated to show the remaining time, colored based on urgency (Green -> Gold -> Red).

## 4. Grave Protection

BTGraves includes listeners to protect graves from common world interactions:

*   **Block Breaking (`BlockBreakListener`):** Prevents players from breaking the player head block that is part of a grave.
*   **Explosions (`BlockExplodeListener`):** Removes grave player heads from the list of blocks affected by an entity explosion, then schedules a task to replace them if they were destroyed (turned to air), effectively making them explosion-proof.
*   **Pistons (`BlockPistonExtendListener`):** Prevents pistons from pushing or pulling the player head block of a grave.
*   **Liquid Flow (`LiquidFlowListener`, `BlockPlaceListener`):**
    *   Prevents liquids (water, lava) from flowing into the block space occupied by a grave's player head.
    *   Prevents players from emptying buckets in a way that would place liquid directly into the grave head's location (specifically, if the grave head is at `y` and liquid is placed at `y-1` targeting the face that would make it flow up).

## 5. Experience Saving (`expPercentage`)

*   When a player dies, VPP calculates the total XP they have (based on their current level and progress to the next level).
*   The `expPercentage` value from `config.yml` (0-100) is applied to this total XP.
*   The resulting amount of XP (converted back into levels and fractional progress) is stored in the grave.
*   When a player restores items from their grave, this saved XP is added back to their current XP.
*   If items are dropped from the grave, the saved XP is spawned as experience orbs.

## 6. Data Persistence (`GravePersistenceManager`)

*   Active grave data (locations, contents, timers, etc.) is stored in memory by `GraveManager`.
*   `GravePersistenceManager` handles saving this data to `plugins/BTGraves/graves.yml`:
    *   When a grave is created or removed.
    *   Periodically (every 10 seconds by default, as seen in `GraveTimeoutManager`).
    *   When the plugin is disabled (server shutdown/reload).
*   On plugin enable, it loads existing grave data from `graves.yml`, respawning armor stands and ensuring timers continue.
*   Items are serialized to Base64 strings for storage in the YAML file.
