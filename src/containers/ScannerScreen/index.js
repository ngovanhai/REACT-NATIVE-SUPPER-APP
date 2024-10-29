import React, { Component, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'mainam-react-native-qrcode-scanner';
import ActivityPanel from '@components/ActivityPanel';
import messageUtils from '@utils/message-utils';
import NavigationService from '@navigators/NavigationService';
import { showConfirm } from "@src";
import { openSettings } from 'react-native-permissions';

export default function ScannerScreen({ route, ...props }) {
    const [state, _setState] = useState({
        isLoading: false,
        isModal: false
    });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };

    const onSuccess = (e) => {
        route.params?.onScan && route.params.onScan(e.data);
        NavigationService.pop();


        // setState({ isLoading: true }, () => {
        //     route.params.onScan && route.params.onScan(e.data);
        //     NavigationService.pop();

        //     // chamCongProvider.requestCheckQr({ qr: e.data }).then(s => {
        //     //     setState({ isLoading: false }, () => {
        //     //         setTimeout(() => {
        //     //             if (scanner)
        //     //                 scanner.reactivate();
        //     //         }, 3000);
        //     //         if (s && s.code == 0) {
        //     //             messageUtils.success("Check in thành công.");
        //     //             return setTimeout(() => {
        //     //                 NavigationService.pop();
        //     //             }, 300)
        //     //         }
        //     //         return messageUtils.error(s.message);
        //     //     });
        //     // }).catch(e => {
        //     //     setState({ isLoading: false }, () => {
        //     //         setTimeout(() => {
        //     //             if (scanner)
        //     //                 scanner.reactivate();
        //     //         }, 1500);
        //     //         return messageUtils.error(e?.message)
        //     //     })
        //     // })
        // });

    }

    const onBlockPermission = () => {
        NavigationService.pop();
        showConfirm({ message: "Ứng dụng cần quyền truy cập camera để quét QRCode của bạn. Vui lòng chấp nhận", cancelText: "Huỷ", acceptText: "Mở cài đặt" }, () => {
            openSettings();
        })
    }


    return (
        <ActivityPanel
            title={"QUÉT MÃ QR"}
            // hideActionbar={true}
            showBackgroundHeader={false}
        >
            <QRCodeScanner
                ref={(node) => { scanner = node }}
                showMarker={true}
                onRead={onSuccess}
                onBlockPermission={onBlockPermission}
                topContent={
                    <Text style={styles.centerText}>
                        Di chuyển camera đến vùng chứa mã QR để quét</Text>
                }
                bottomContent={
                    <TouchableOpacity onPress={() => { NavigationService.pop() }}>
                        <Text style={[styles.centerText, { fontSize: 16 }]}> Quay lại</Text>
                    </TouchableOpacity>
                }

            />
        </ActivityPanel>
    );
}





const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
    buttonCheckIn: {
        height: 30,
        width: 100,
        backgroundColor: "aqua",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        position: "absolute"
    }
})
