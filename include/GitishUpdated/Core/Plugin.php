<?php
/**
 *	@package GitishUpdated\Core
 *	@version 1.0.0
 *	2018-09-22
 */

namespace GitishUpdated\Core;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}


use GitishUpdated\PostType;
use GitishUpdated\Compat;

class Plugin extends Singleton {

	/** @var string plugin main file */
	private $plugin_file;

	/** @var array metadata from plugin file */
	private $plugin_meta;

	/** @var string plugin components which might need upgrade */
	private static $components = array();

	/**
	 *	@inheritdoc
	 */
	protected function __construct( $file ) {

		$this->plugin_file = $file;

		parent::__construct();
	}

	/**
	 *	@return string full plugin file path
	 */
	public function get_plugin_file() {
		return $this->plugin_file;
	}

	/**
	 *	@return string full plugin file path
	 */
	public function get_plugin_dir() {
		return plugin_dir_path( $this->get_plugin_file() );
	}

	/**
	 *	@return string Path to the main plugin file from plugins directory
	 */
	public function get_wp_plugin() {
		return str_replace( trailingslashit( WP_PLUGIN_DIR ), '', $this->plugin_file );
	}

	/**
	 *	@return string current plugin version
	 */
	public function get_version() {
		return $this->get_plugin_meta( 'Version' );
	}

	/**
	 *	@param string $which Which plugin meta to get. NUll
	 *	@return string|array plugin meta
	 */
	public function get_plugin_meta( $which = null ) {
		if ( ! isset( $this->plugin_meta ) ) {
			$this->plugin_meta = get_plugin_data( $this->plugin_file() );
		}
		if ( isset( $this->plugin_meta[ $which ] ) ) {
			return $this->plugin_meta[ $which ];
		}
		return $this->plugin_meta;
	}

}
