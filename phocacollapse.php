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

defined( '_JEXEC' ) or die( 'Restricted access' );
jimport( 'joomla.plugin.plugin' );

class plgSystemPhocaCollapse extends JPlugin
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

		$wa = $app->getDocument()->getWebAssetManager();
		$wa->registerAndUseScript('plg_system_phocacollapse.phocacollapse', 'media/plg_system_phocacollapse/js/phocacollapse.es6.js', array('version' => 'auto'));
		$wa->registerAndUseStyle('plg_system_phocacollapse.phocacollapse', 'media/plg_system_phocacollapse/css/phocacollapse.css', array('version' => 'auto'));

	}

	function onAfterRender() {

		$app = Factory::getApplication();
		if ($app->getDocument()->getType() !== 'html') {
			return true;
		}

		$buffer = $app->getBody();

		$from = '<div class="subform-repeatable-wrapper subform-layout">';
		$to   = $from . '<div class="ph-collapse"><a href="#" class="phCollapseClick">' . Text::_('PLG_SYSTEM_PHOCACOLLAPSE_SHOW_HIDE') . '</a></div>';

		$buffer = str_replace($from, $to, $buffer);

		$app->setBody($buffer);
		return true;
	}
}
?>
