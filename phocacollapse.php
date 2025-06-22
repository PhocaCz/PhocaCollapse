<?php
/* @package Joomla
 * @copyright Copyright (C) Open Source Matters. All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see LICENSE.php
 * @extension Phoca Extension
 * @copyright Copyright (C) Jan Pavelka www.phoca.cz
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
 */


use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Plugin\CMSPlugin;

defined( '_JEXEC' ) or die( 'Restricted access' );
jimport( 'joomla.plugin.plugin' );

class plgSystemPhocaCollapse extends CMSPlugin
{

	public function __construct(& $subject, $config) {
		$this->loadLanguage('plg_system_phocacollapse');
		parent::__construct($subject, $config);
	}

	function onBeforeRender() {

		$app 	= Factory::getApplication();
		if ($app->getDocument()->getType() !== 'html') {
			return true;
		}

		$frontend_active 		= $this->params->get('frontend_active', 0);
		if ($frontend_active == 0 && !Factory::getApplication()->isClient('administrator')) {
			return true;
		}

		$wa = $app->getDocument()->getWebAssetManager();
		$wa->registerAndUseScript('plg_system_phocacollapse.phocacollapse', 'media/plg_system_phocacollapse/js/phocacollapse.es6.js', array('version' => 'auto'));
		$wa->registerAndUseStyle('plg_system_phocacollapse.phocacollapse', 'media/plg_system_phocacollapse/css/phocacollapse.css', array('version' => 'auto'));

	}

	function onAfterRender() {

		$app = Factory::getApplication();
		if ($app->getDocument()->getType() !== 'html') {
			return true;
		}
		$frontend_active 		= $this->params->get('frontend_active', 0);
		if ($frontend_active == 0 && !Factory::getApplication()->isClient('administrator')) {
			return true;
		}

		$text_format 		= $this->params->get('text_format', 1);

		$text = Text::_('PLG_SYSTEM_PHOCACOLLAPSE_SHOW_HIDE');
		$class = 'phCollapseClick';
		$icon = '<span class="icon-eye" aria-hidden="true"></span>';

		switch($text_format){

			case 2:
				//$text = $text;
			break;

			case 3:
				$text = '<span class="icon-eye icon-white" aria-hidden="true" style="pointer-events: none;"></span>';
				$class = 'group-show btn btn-primary btn-sm phCollapseClick';
			break;

			case 1:
			default:
				$text = $icon . ' ' . $text;
			break;
		}



		$buffer = $app->getBody();

		$from = '<div class="subform-repeatable-wrapper subform-layout">';
		$to   = $from . '<div class="ph-collapse"><a href="javascript:void(0)" class="'.$class.'" data-name="phCollapseClick">' . $text . '</a></div>';

		$buffer = str_replace($from, $to, $buffer);

		$from = '<table class="table" id="itemList">';
		$to   = $from . '<div class="ph-collapse"><a href="javascript:void(0)" class="'.$class.'" data-name="phCollapseClickMenu">' . $text . '</a></div>';

		$buffer = str_replace($from, $to, $buffer);


		$from = '<table class="table itemList" id="articleList">';
		$to   = $from . '<div class="ph-collapse"><a href="javascript:void(0)" class="'.$class.'" data-name="phCollapseClickArticle">' . $text . '</a></div>';

		$buffer = str_replace($from, $to, $buffer);


		$app->setBody($buffer);
		return true;
	}
}
?>
