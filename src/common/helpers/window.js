import { Dimensions, StatusBar } from 'react-native'; 
import { HEADER_HEIGHT } from '../../components/header';
import { MENU_HEIGHT } from '../../components/menu-bar/menu-bar';

export function getScreanHeight() {
    const { height } = Dimensions.get('window');
    const statusBarHeight = StatusBar.statusBarHeight || 24;
    return height - statusBarHeight;
}

export function getListHeight() {
    const height = getScreanHeight();
    return height - HEADER_HEIGHT - MENU_HEIGHT;
}