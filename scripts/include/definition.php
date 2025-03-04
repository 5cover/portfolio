<?php
require_once 'content.php';
require_once 'lang.php';
require_once 'linking.php';

final class Definition
{
    private readonly string $title;
    public readonly string $term;
    protected readonly Lang $lang;
    readonly string $id;
    readonly LinkedData $data;

    public function __construct(Lang $lang, string $id, LinkedData $data)
    {
        $this->lang = $lang;
        $this->id = $id;
        $this->data = $data;

        $name = $data->get('name');
        $abbr = $name->get('abbr');
        $this->title = $name->get('full') . ($abbr === null ? '' : " ($abbr)");
        $this->term = $abbr ?? $name->get('short') ?? $name->get('full');
    }

    public function get_tooltip_trigger(?string $name = null): string
    {
        return '<a target="_blank" rel="noopener noreferrer" href="' . $this->data->get('wiki')
            . '" data-definition-id="' . $this->id
            . '" class="link definition-tooltip-trigger">'
            . ($name ?? $this->term) . '</a>';
    }

    public function put_card()
    {
?><article class="definition" <?php
        if ($bg = $this->data->get('background') ?? null) {
            echo get_background_style_attr($bg, 'bg-img-card');
        }
?>>
    <h4><a class="foil" target="_blank" rel="noopener noreferrer" href="<?= $this->data->get('wiki') ?>"><?= $this->title ?></a></h4>
    <?php if ($logo = $this->data->get('logo') ?? null) {
            echo get_graphic_element($logo->get('isThemedSvg'), $logo->get('url'), $this->lang->fmtTitle($this->title), 'logo');
        } ?>
    <p class="type"><small><?= ucfirst(LinkedData::get_json_file($this->lang, 'types')->get($this->data->get('type'))) ?></small></p>
    <p class="synopsis"><?= $this->data->get('synopsis') ?></p>
</article><?php
    }

    /**
     * Puts a list of definition cards.
     * @param iterable<Definition> $definitions
     */
    public static function put_card_list(iterable $definitions)
    {
?>
<ul class="lvl list-definition">
    <?php foreach ($definitions as $definition) { ?>
    <li><?php $definition->put_card() ?></li>
    <?php } ?>
</ul>
<?php
    }
}

