// import React, { PureComponent } from 'react';
// import { View, TouchableOpacity } from 'react-native';
// import AnimateLoadingButton from 'react-native-animate-loading-button';
// import { FONTS } from '../shared/themes/fonts';
// import { fp, hp, wp } from '../shared/utils/responsive-screen';
// import { COLOURS } from '../shared/themes/color';

// // create a component
// export const LoaderButtonComponent = ({ buttonRef, title, method }) => {
//     return (
//         <TouchableOpacity
//             onPress={() => method()}
//             activeOpacity={0.7}
//         >
//             <AnimateLoadingButton
//                 ref={buttonRef}
//                 width={'90%'}
//                 height={50}
//                 title={title}
//                 onPress={null}
//                 //titleWeight={"700"}
//                 titleFontFamily={FONTS.semibold}
//                 titleFontSize={fp(15)}
//                 titleColor={COLOURS.white}
//                 activityIndicatorColor={COLOURS.white}
//                 backgroundColor={COLOURS.blue}
//                 borderRadius={10}
//                 animationDurationWidth={Platform.OS == 'ios' ? 500 : 600}
//             />
//         </TouchableOpacity>
//     );
// };

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { FONTS } from '../shared/themes/fonts';
import { COLOURS } from '../shared/themes/color';

export default class LoadingButton extends PureComponent {
    _onPressHandler() {
        this.loadingButton.showLoading(true);
        this.props.onpress()

        setTimeout(() => {
            this.loadingButton.showLoading(false);
        }, 2000);
    }

    render() {
        const { title, onpress } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: 'rgb(255,255,255)', justifyContent: 'center' }}>
                <AnimateLoadingButton
                    ref={c => (this.loadingButton = c)}
                    width={300}
                    height={50}
                    title={title}
                    titleFontSize={16}
                    titleWeight={'100'}
                    titleColor="rgb(255,255,255)"
                    titleFontFamily={FONTS.semibold}
                    backgroundColor={COLOURS.blue}
                    borderRadius={10}
                    onPress={this._onPressHandler.bind(this)}
                // onPress={() => {
                //     // onpress()
                //     this._onPressHandler.bind(this)
                // }
                // }
                />
            </View>
        );
    }
}
