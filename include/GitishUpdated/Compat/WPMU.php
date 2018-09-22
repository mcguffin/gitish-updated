<?php
/**
 *	@package GitishUpdated\Compat
 *	@version 1.0.0
 *	2018-09-22
 */

namespace GitishUpdated\Compat;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}


use GitishUpdated\Core;


class WPMU extends Core\PluginComponent {

	protected function __construct() {
	}

	/**
	 *	@inheritdoc
	 */
	 public function activate(){

	 }

	 /**
	  *	@inheritdoc
	  */
	 public function deactivate(){

	 }

	 /**
	  *	@inheritdoc
	  */
	 public function uninstall() {
		 // remove content and settings
	 }

	/**
 	 *	@inheritdoc
	 */
	public function upgrade( $new_version, $old_version ) {
	}

}
